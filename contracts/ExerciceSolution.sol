pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciceSolution is ERC20 
{

    address internal _owner;
    // ICO tier list
    // Tier 0 : can't buy tokens
    // Tier 1 : can buy tokens with _multiplier = 1
    // Tier 2 : can buy tokens with _multiplier = 2
    mapping(address => uint) internal _tier;

    constructor(string memory _name, string memory _symbol, uint256 _supply) public ERC20(_name, _symbol) {
        _mint(msg.sender, _supply);
        _owner = address(msg.sender);
    }
        
    function getToken() external returns (bool) {
        require(_tier[msg.sender] > 0, "You are not whitelisted");
        require(balanceOf(_owner) > 100000, "The ICO is closed");
        _transfer(_owner, msg.sender, 100);
        return true;
    }

    function buyToken() external payable returns (bool) {
        require(_tier[msg.sender] > 0, "You are not whitelisted");
        uint256 _multiplier = _tier[msg.sender];
        require(balanceOf(_owner) > msg.value * _multiplier, "The ICO is closed");
        _transfer(_owner, msg.sender, msg.value * _multiplier);
        return true;
    }

    function setTier(address _addr, uint256 tier) public {
        require(_owner == msg.sender, "You can't set your tier");
        require(tier <= 2, "The tier must be between 0 and 2");
        _tier[_addr] = tier;
    }

    function isCustomerWhiteListed(address customerAddress) external returns (bool) {
        return _tier[customerAddress] > 0;
    }

    function customerTierLevel(address customerAddress) external returns (uint256) {
        return _tier[customerAddress];
    }
}