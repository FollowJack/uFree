pragma solidity ^0.4.17;

contract VisaApplication {
  address owner;
  string public destination;

  constructor() public {
    owner = msg.sender;
  }

  event Application(address owner, string destination);

  /* function addDestination() public pure returns (bool){
      // destination = "heaven";
      /* emit Application(owner, _destination);

      return true;
  } */
  /* function addDestination() public view returns (string){
      // destination = "heaven";
      /* emit Application(owner, _destination);

      return "heaven";
  } */
  function test() public returns(address) {
    return owner;
  }

}
