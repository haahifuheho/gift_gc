// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
 
contract GiftNFT is ERC721Enumerable {
    event Gift(address recipient, string message, uint256 tokenId);
    mapping(uint256 => string) private _tokenMessages;

    constructor() ERC721("GiftNFT", "GIFT") {}
 
    function giftNFT(address recipient, string memory message) public returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        _mint(recipient, tokenId);
        _tokenMessages[tokenId] = message;
        emit Gift(recipient, message, tokenId);
        return tokenId;
    }

    function tokenMessage(uint256 tokenId) public view returns (string memory) {
        return _tokenMessages[tokenId];
    }
}
