// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
 
contract GiftMessage is ERC721Enumerable {
 
    event Gift(address recipient, string message, uint256 tokenId);
 
    mapping(uint256 => string) private _tokenMessages;
 
    constructor() ERC721("SoulBandToken", "SBT") {}
 
    function giftNFT(address recipient, string memory message) public returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        _mint(recipient, tokenId);
        _tokenMessages[tokenId] = message;
        emit Gift(recipient, message, tokenId);
        return tokenId;
    }
 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint batchSize)
    internal override(ERC721Enumerable) {
        require(from == address(0) || from == 0x7D53b7c9FdE2889Bef30dd8feD658AF114ed050c, "Err: token is SOUL BOUND");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
 
    function tokenMessage(uint256 tokenId) public view returns (string memory) {
        return _tokenMessages[tokenId];
    }
}