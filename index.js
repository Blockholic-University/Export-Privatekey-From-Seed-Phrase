const { hdkey } = require("ethereumjs-wallet");
const bip39 = require("bip39");

const seedPhase = "throw shock car void brisk three fee move toward issue cereal figure buddy reason between"
const hdPath = "m/44'/60'/0'/0/";

async function generateAccountsFromSeed(seedPhase, numAccount = 10) {
  const seed = await bip39.mnemonicToSeed(seedPhase);
  const hdWallet = hdkey.fromMasterSeed(seed);
  const accounts = [];

  for (let i=0; i< numAccount; i++) {
    const wallet = hdWallet.derivePath(hdPath + i).getWallet();
    const address = `0x${wallet.getAddress().toString("hex")}`;
    const privateKey = wallet.getPrivateKey().toString("hex");
    accounts.push({
      address,
      privateKey
    })
  }
  return accounts;
}

generateAccountsFromSeed(seedPhase)
  .then((accounts) => {
    console.log("Accounts and Private Keys:");
    accounts.forEach((account, index) => {
      console.log(
        `Account ${index + 1}: Address: ${account.address}, Private Key: ${
          account.privateKey
        }`
      );
    });
  })
  .catch(console.error);
