/* pragma solidity ^0.4.17;

// You can apply
// You get approved by some authority
// Someone with the address of you and the contract can validate if your visa is valid

// 1. Who is the owner of the contract
// 2. Who does someone authority approves the visa
// 3. How can someone verify the Visa


contract VisaApplication {

    enum Status  { Pending, Approved, Denied }

  address owner;
  address signedByAuthority;
  //address authorityToProve = 0xc0ffee254729296a45a3885639AC7E10F9d54979;
  string public destination;
  uint public validFrom;
  uint public validUntil;
  Status public status;

  constructor(string _destination, uint _validFrom, uint _validUntil) public {
    owner = msg.sender;
    destination = _destination;
    validFrom = _validFrom;
    validUntil = _validUntil;
    status = Status.Pending;
  }

  event ApplicationApproved(address authority);
  event ApplicationDenied(address authority);


    function deny() external {
        // callable by authority register
        status = Status.Denied;
        signedByAuthority = msg.sender;
            ApplicationDenied(signedByAuthority);

   }

   function approve() external {

        status = Status.Approved;
        signedByAuthority = msg.sender;
            ApplicationApproved(signedByAuthority);
   }



} */
