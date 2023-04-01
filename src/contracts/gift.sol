pragmasolidity^0.8.0;
 
import"@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
 
contract GiftNFT is ERC721Enumerable {​​​​​​​​
    mapping(uint256 => string)private _tokenMessages;

    constructor() ERC721("GiftNFT","GIFT"){​​​​​​​​}​​​​​​​​
 
    function giftNFT(address recipient,stringmemory message)publicreturns(uint256){​​​​​​​​
    uint256 tokenId = totalSupply()+1;
        _safeMint(recipient, tokenId);
        _tokenMessages[tokenId]= message;
        emit Gift(recipient, message, tokenId);
    return tokenId;
    }   ​  ​​​​​​​

    function tokenMessage(uint256 tokenId)publicviewreturns(stringmemory){​​​​​​​​
        return _tokenMessages[tokenId];
    }​​​​​​​​
}​​​​​​​​
