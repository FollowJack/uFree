var Migrations = artifacts.require("./Migrations.sol");
var VisaApplication = artifacts.require("./VisaApplication.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(VisaApplication);
};
