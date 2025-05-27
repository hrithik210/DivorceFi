// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "src/RelationshipContract.sol";

contract TestContract is Test {
    RelationshipContract c;

    address user1 = 0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD ;
    address user2 = 0x61A7BE937926D39c382E1ACa0aa9765D2A2f150a ;

    function setUp() public {
        c = new RelationshipContract();
        vm.deal(user1, 10 ether);
        vm.deal(user2, 10 ether);
    }

    function testBar() public {
        assertEq(uint256(1), uint256(1), "ok");
    }


    function testRelationshipMint() public {
        vm.prank(user1);

        c.mintRelationship{value : 1 ether}(user2);
        assertEq(c.ownerOf(1), user1);
        (address p1 , address p2 , uint amount , bool isActive) = c.getRelationshipStatus(1);
    }

}
