const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD");
var evaluator = artifacts.require("Evaluator");
var solution = artifacts.require("ExerciceSolution");


module.exports = (deployer, network, accounts) => {
	console.log(network)
	if (network != "ganache") return;
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts);
        await deployRecap(deployer, network, accounts); 
		await makeExercise(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"), {from: accounts[1]})
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address)
}

async function deploySolution(deployer, network, accounts, ticker, supply) {
	Solution = await solution.new(ticker, ticker, web3.utils.toBN(supply))
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true, {from: accounts[1]})
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers, {from: accounts[1]});
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function makeExercise(deployer, network, accounts) {
	const startBalance = await TDToken.balanceOf(accounts[0])
	console.log("startBalance " + startBalance)

	let send = await web3.eth.sendTransaction({from:accounts[0],to:Evaluator.address, value:web3.utils.toBN(web3.utils.toWei('0.05', "ether"))});


	// Exercice 1
	console.log("====== Exercice 1 ======")
	await Evaluator.ex1_getTickerAndSupply({from: accounts[0]});
	const ticker = await Evaluator.readTicker(accounts[0])
	const supply = await Evaluator.readSupply(accounts[0])
	console.log("Ticker: " + ticker)
	console.log("Supply: " + supply)
	const ex1_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex1_balance " + ex1_balance)

	// Exercice 2
	console.log("====== Exercice 2 ======")
	await deploySolution(deployer, network, accounts, ticker, supply)
	await Evaluator.submitExercice(Solution.address, {from: accounts[0]})
	await Evaluator.ex2_testErc20TickerAndSupply({from: accounts[0]});
	const ex2_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex2_balance " + ex2_balance)

	// Evaluator white listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: accounts[0]})

	// Exercice 3
	console.log("====== Exercice 3 ======")
	await Evaluator.ex3_testGetToken({from: accounts[0]});
	const ex3_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex3_balance " + ex3_balance)

	// Exercice 4
	console.log("====== Exercice 4 ======")
	await Evaluator.ex4_testBuyToken({from: accounts[0]});
	const ex4_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex4_balance " + ex4_balance)

	// Evaluator black listed
	await Solution.setTier(Evaluator.address, 0, {from: accounts[0]})

	// Exercice 5
	console.log("====== Exercice 5 ======")
	await Evaluator.ex5_testDenyListing({from: accounts[0]});
	const ex5_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex5_balance " + ex5_balance)

	// White listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: accounts[0]})

	// Exercice 6
	console.log("====== Exercice 6 ======")
	await Evaluator.ex6_testAllowListing({from: accounts[0]});
	const ex6_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex6_balance " + ex6_balance)

	// Evaluator black listed
	await Solution.setTier(Evaluator.address, 0, {from: accounts[0]})

	// Exercice 7
	console.log("====== Exercice 7 ======")
	await Evaluator.ex7_testDenyListing({from: accounts[0]});
	const ex7_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex7_balance " + ex7_balance)

	// White listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: accounts[0]})

	// Exercice 8
	console.log("====== Exercice 8 ======")
	await Evaluator.ex8_testTier1Listing({from: accounts[0]});
	const ex8_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex8_balance " + ex8_balance)

	// White listed - tier 2
	await Solution.setTier(Evaluator.address, 2, {from: accounts[0]})

	// Exercice 9
	console.log("====== Exercice 9 ======")
	await Evaluator.ex9_testTier2Listing({from: accounts[0]});
	const ex9_balance = await TDToken.balanceOf(accounts[0])
	console.log("ex9_balance " + ex9_balance)
}

