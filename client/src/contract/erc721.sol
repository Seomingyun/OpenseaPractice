// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// openzepplin을 통해 상속받은 컨트랙트 중 겹치는 함수에 대해 override 함.
contract cozNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // constructor(string name, string symbol)
    // name: token name, symbol: token symbol
    constructor() ERC721("cozNFT", "NFT"){} 

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal
      override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn( // 해당 token 없애기
        uint256 tokenId
    ) internal
      override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view
      override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // 토큰 발행
    function mintNFT(address _recipient, string memory _tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment(); // 토큰 아이디 하나 증가시켜줌

        uint256 newItemId = _tokenIds.current(); // 현재 토큰ID 값을 지금 아이템의 id로 설정해주기
        // _mint(address to, uint256 tokenId)
        // 새로운 토큰을 mint하는 internal 함수
        // 만약 이미 존재하는 tokenId를 넘겨주면 에러를 발생.
        _mint(_recipient, newItemId); // NFT 받는사람(소유자)와 token Id 설정해줌 -> minting
        // _setTokenURI(uint256 tokenId, string _tokenURI)
        // 입력값으로 들어온 token에 tokenURI를 할당.
        _setTokenURI(newItemId, _tokenURI); // Token에 TokenURI 연결해주기

        return newItemId;
    }
}
