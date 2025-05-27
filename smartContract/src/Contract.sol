// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";  
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";


contract RelationshipContract is ERC721, ReentrancyGuard, Ownable { 
  uint nexttokenId = 1;

  struct Relationship{
    address partner1;
    address partner2;
    uint256 stakeAmount;
    bool isActive;
  }

  mapping(uint => Relationship) public relationships;

  event RelationshipMinted(uint tokenId , address indexed partner1 , address indexed partner2 , uint stakeAmount);
  event DivorceEvent(uint indexed tokenId , uint indexed payout);

  constructor() ERC721("RelationshipToken", "REL") {

  }

  function mintRelationship(address _partner2 ) external payable nonReentrant{
    require(msg.sender != _partner2 , "cant date yourself lil bro");
    require(msg.value > 0 , "amount should be more than 0");

    uint tokenId = nexttokenId++;
    _mint(msg.sender, tokenId);

    relationships[tokenId] = Relationship({
      partner1 : msg.sender,
      partner2 : _partner2,
      stakeAmount : msg.value,
      isActive : true
    });

    emit RelationshipMinted(tokenId, msg.sender, _partner2, msg.value);
    
  }

  function Divorce(uint tokenId) external nonReentrant{
    Relationship storage rel = relationships[tokenId];
    require(rel.isActive , "relationship already broken");
    require(msg.sender == rel.partner1 || msg.sender == rel.partner2 , "not ur relationship to break");

    uint payout = rel.stakeAmount/2 ;

    if(payout >0){
      (bool sent1,) = rel.partner1.call{value : payout}("");
      require(sent1, "faled to send to partner 1");

      (bool sent2,) = rel.partner2.call{value : payout}("");
      require(sent2, "faled to send to partner 2");
    }

    //burning nft
    _burn(tokenId);
    rel.isActive = false;

    emit DivorceEvent(tokenId, payout);
  }


}
