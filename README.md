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
