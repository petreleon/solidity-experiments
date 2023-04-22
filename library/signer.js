require('dotenv').config();
const ethUtil = require('ethereumjs-util');
const { ethers } = require("ethers");
const abiEncoder = new ethers.AbiCoder();

// Sign a message using the private key stored in an environment variable
function signMessage(id, expiry, tokenAddress, recipient, amount) {
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

  // Encode the message as per the Solidity contract
  const message = ethUtil.bufferToHex(
    Buffer.from(
      ethUtil.keccak256(
        Buffer.concat([
          ethUtil.setLengthLeft(ethUtil.toBuffer(id), 32),
          ethUtil.setLengthLeft(ethUtil.toBuffer(expiry), 32),
          ethUtil.setLengthLeft(ethUtil.toBuffer(tokenAddress), 20),
          ethUtil.setLengthLeft(ethUtil.toBuffer(recipient), 20),
          ethUtil.setLengthLeft(ethUtil.toBuffer(amount), 32)
        ])
      )
    )
  );
  

  // Sign the message
  const { v, r, s } = ethUtil.ecsign(ethUtil.toBuffer(message), privateKey);

  // Combine v, r, s to form the signature
  const signature = ethUtil.bufferToHex(Buffer.concat([r, s, ethUtil.toBuffer(v)]));

  return signature;
}

module.exports = signMessage;
