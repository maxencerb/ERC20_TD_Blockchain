const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD");
var evaluator = artifacts.require("Evaluator");
var solution = artifacts.require("ExerciceSolution");

const evaluatorAdress = "0xcff8985FF63cDce92036A2747605FB7ead26423e"
const TDErc20Adress = "0xbf23538e0c8AB87f517E2d296cb0E71D3d3AFE8F"
const account = "0x3Ab484E75884b42AD86BE388D04b7B3208a5c6cD"


module.exports = (deployer, network, accounts) => {
	console.log(network)
	console.log(accounts)
	if (network != "rinkeby") return;
    deployer.then(async () => {
        await getTDToken(deployer, network, accounts); 
        await getEvaluator(deployer, network, accounts);
		await makeExercise(deployer, network, accounts);
    });
};

async function getTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.at(TDErc20Adress)
}

async function getEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.at(evaluatorAdress)
}

async function deploySolution(deployer, network, accounts, ticker, supply) {
	Solution = await solution.new(ticker, ticker, web3.utils.toBN(supply), {from: account})
}

async function makeExercise(deployer, network, accounts) {

	const startBalance = await TDToken.balanceOf(account)
	console.log("startBalance " + startBalance)

	let send = await web3.eth.sendTransaction({from:account,to:Evaluator.address, value:web3.utils.toBN(web3.utils.toWei('0.05', "ether"))});


	// Exercice 1
	console.log("====== Exercice 1 ======")
	await Evaluator.ex1_getTickerAndSupply({from: account});
	const ticker = await Evaluator.readTicker(account)
	const supply = await Evaluator.readSupply(account)
	console.log("Ticker: " + ticker)
	console.log("Supply: " + supply)
	const ex1_balance = await TDToken.balanceOf(account)
	console.log("ex1_balance " + ex1_balance)

	// Exercice 2
	console.log("====== Exercice 2 ======")
	await deploySolution(deployer, network, accounts, ticker, supply)
	await Evaluator.submitExercice(Solution.address, {from: account})
	await Evaluator.ex2_testErc20TickerAndSupply({from: account});
	const ex2_balance = await TDToken.balanceOf(account)
	console.log("ex2_balance " + ex2_balance)

	// Evaluator white listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: account})

	// Exercice 3
	console.log("====== Exercice 3 ======")
	await Evaluator.ex3_testGetToken({from: account});
	const ex3_balance = await TDToken.balanceOf(account)
	console.log("ex3_balance " + ex3_balance)

	// Exercice 4
	console.log("====== Exercice 4 ======")
	await Evaluator.ex4_testBuyToken({from: account});
	const ex4_balance = await TDToken.balanceOf(account)
	console.log("ex4_balance " + ex4_balance)

	// Evaluator black listed
	await Solution.setTier(Evaluator.address, 0, {from: account})

	// Exercice 5
	console.log("====== Exercice 5 ======")
	await Evaluator.ex5_testDenyListing({from: account});
	const ex5_balance = await TDToken.balanceOf(account)
	console.log("ex5_balance " + ex5_balance)

	// White listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: account})

	// Exercice 6
	console.log("====== Exercice 6 ======")
	await Evaluator.ex6_testAllowListing({from: account});
	const ex6_balance = await TDToken.balanceOf(account)
	console.log("ex6_balance " + ex6_balance)

	// Evaluator black listed
	await Solution.setTier(Evaluator.address, 0, {from: account})

	// Exercice 7
	console.log("====== Exercice 7 ======")
	await Evaluator.ex7_testDenyListing({from: account});
	const ex7_balance = await TDToken.balanceOf(account)
	console.log("ex7_balance " + ex7_balance)

	// White listed - tier 1
	await Solution.setTier(Evaluator.address, 1, {from: account})

	// Exercice 8
	console.log("====== Exercice 8 ======")
	await Evaluator.ex8_testTier1Listing({from: account});
	const ex8_balance = await TDToken.balanceOf(account)
	console.log("ex8_balance " + ex8_balance)

	// White listed - tier 2
	await Solution.setTier(Evaluator.address, 2, {from: account})

	// Exercice 9
	console.log("====== Exercice 9 ======")
	await Evaluator.ex9_testTier2Listing({from: account});
	const ex9_balance = await TDToken.balanceOf(account)
	console.log("ex9_balance " + ex9_balance)
}

