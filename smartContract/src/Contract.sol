// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";  
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";


contract RelationshipContract is ERC721, ReentrancyGuard, Ownable { 
  uint tokenId = 1;

  struct Relationship{
    address partner1;
    address partner2;
    uint256 stakeAmount;
    bool isActive;
  }

  mapping(uint => Relationship) public relationships;

  constructor() ERC721("RelationshipToken", "REL") {

  }


}
