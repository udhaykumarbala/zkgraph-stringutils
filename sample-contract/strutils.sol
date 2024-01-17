// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract ZKStringUtils{
    string public resultString;
    event Until(string,string);
    event Beyond(string,string);
    event Find(string,string);
    event Rfind(string,string);
    event Concat(string,string);

    function until(string calldata slice, string calldata needle) external {
        emit Until(slice,needle);
    }

    function beyond(string calldata slice, string calldata needle) external {
        emit Beyond(slice,needle);
    }

    function find(string calldata slice, string calldata needle) external {
        emit Find(slice,needle);
    }

    function rfind(string calldata slice, string calldata needle) external {
        emit Rfind(slice,needle);
    }

    function concat(string calldata slice1, string calldata slice2) external {
        emit Concat(slice1,slice2);
    }



    function run(string calldata value) external{
        resultString = value;
    }

}