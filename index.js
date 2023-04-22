// const Wallet = require('ethereumjs-wallet').default;

// // Generate a new Ethereum wallet
// const wallet = Wallet.generate();

// // Get the private key and public key
// const privateKey = wallet.getPrivateKeyString();
// const publicKey = wallet.getPublicKeyString();
// const address = wallet.getAddressString();

// console.log('Private Key:', privateKey);
// console.log('Public Key:', publicKey);
// console.log('Address:', address);


// const signer = require('./library/signer');

// // Sign a message
// const signature = signer(
//     1,
//     1682019828,
//     '0xb6c047A0e527feE8e548B5626F13564Ec7e74679',
//     '0xBACdE84F0d5AC497B52576Dd5d63284ba20425DF',
//     100000
// );
// console.log('Signature:', signature);

require('dotenv').config();
const { ethers } = require('ethers');
const { splitSignature } = require('@ethersproject/bytes');
const web3 = require('web3');
const web3_ = new web3('HTTP://127.0.0.1:7545');


async function signMessage() {
    // Load the private key from the environment variable
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);

    // Message to sign
    const message = 'hello';
    console.log({ message });


    // Hash the message
    // const messageHash = web3.utils.keccak256(message);
    // console.log({ messageHash });
    // Sign message
    const signature = await wallet.signMessage(message);
    console.log({ signature });
    console.log("wallet:", wallet.address)

    // Split signature
    const sig = splitSignature(signature);
    console.log({ r: sig.r, s: sig.s, v: sig.v });

    // Recover signer using web3
    const recoveredSigner = await web3_.eth.accounts.recover(message, signature);

    console.log({ recoveredSigner, recoveredSigner2: wallet.address });
    // web3_.eth.personal.ecRecover(message, signature).then(console.log);
}

signMessage();
