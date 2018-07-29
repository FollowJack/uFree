/* pragma solidity ^0.4.17;


contract VisaRegistry {

    struct Status {

    }

    address owner;
    address[] authorities;
    address[] applications;
    mapping(address => Status) applicationAddressToStatus;


    constructor() {
        owner = msg.sender;
    }

    event ApplicationApproved(address );
    event ApplicationDenied(address);


    function validateByAuthority(bool _isApproved) {
        // Prove if the authority is the caller

        if(_isApproved){
        emit ApplicationApproved();
        } else {
          ApplicationDenied();
        }
    }

    function addApplication(address _applicationAddress) returns (bool) {

    }

    function addAuthority(address) returns (bool) {

    }

    function removeAuthority(address) returns (bool) {

    }


} */
