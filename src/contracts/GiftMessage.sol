// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract GiftMessage is ERC721Enumerable {

    event Gift(address recipient, string message, uint256 tokenId);

    mapping(uint256 => string) private _tokenMessages;
    mapping(uint256 => bool) private _isGifted;

    constructor() ERC721("SoulBandToken", "SBT") {}

    function giftNFT(address recipient, string memory message) public returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(recipient, tokenId);
        _tokenMessages[tokenId] = message;
        emit Gift(recipient, message, tokenId);
        return tokenId;
    }

    function giftSBT(address recipient, string memory message) public returns (uint256) {
        require(!_isGifted[totalSupply()], "This NFT has already been gifted and cannot be sold");
        uint256 tokenId = totalSupply() + 1;
        _safeMint(recipient, tokenId);
        _tokenMessages[tokenId] = message;
        _isGifted[tokenId] = true;
        emit Gift(recipient, message, tokenId);
        return tokenId;
    }

    function tokenMessage(uint256 tokenId) public view returns (string memory) {
        return _tokenMessages[tokenId];
    }
}
