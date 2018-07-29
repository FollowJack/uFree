pragma solidity ^0.4.17;

contract VisaApplication {
  address public owner;
  string public destination;
  string public from;
  string public to;

  constructor(string _destination, string _from, string _to) public {
    owner = msg.sender;
    destination = _destination;
    from = _from;
    to = _to;
  }

}
