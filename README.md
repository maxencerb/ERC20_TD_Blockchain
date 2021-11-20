# Blockchain TD on ERC20

&copy; Maxence Raballand 2021

The migration automatically validates the exercices.

There is one deployement for local network (ganache) in `2_local_deployment.js` and one for test network (rinkeby) in `3_rinkeby_deploy.js`.

The infura api key and the mnemonic had been removed from this repository for security. You can put them in `truffle-config.js`.

Another way, without modifying the code would be to type this in the console :

```bash
export INFURA_API_KEY=<you-api-key>
export MNEMONIC=<your-mnemonic>
```

## Informations about the Exercices

Here are the adresses of the contracts and wallet used to validate these exercices.

| Name | Address |
| --- | --- |
| My ERC20 Token | [0x232e3d2f505da50e20839e328f0713d9fa28420c](https://rinkeby.etherscan.io/address/0x232e3d2f505da50e20839e328f0713d9fa28420c) |
| My address | [0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD](https://rinkeby.etherscan.io/address/0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD) |
| Evaluator | [0xcff8985FF63cDce92036A2747605FB7ead26423e](https://rinkeby.etherscan.io/address/0xcff8985FF63cDce92036A2747605FB7ead26423e) |
| ERC20TD | [0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F](https://rinkeby.etherscan.io/address/0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F) |
