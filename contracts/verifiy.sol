// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "imports.sol";

contract PrefixedSignatureVerifier {
    function hashString(string memory input) public pure returns (bytes32) {
        bytes memory inputBytes = bytes(input);
        return ECDSA.toEthSignedMessageHash(inputBytes);
    }

    function recoverSigner(bytes32 messageHash, bytes memory signature) public pure returns (address) {
        address signer = ECDSA.recover(messageHash, signature);
        return signer;
    }

    function verifySignature(string memory input, bytes memory signature, address expectedSigner) public pure returns (bool) {
        bytes32 messageHash = hashString(input);
        address signer = recoverSigner(messageHash, signature);
        return signer == expectedSigner;
    }
}
