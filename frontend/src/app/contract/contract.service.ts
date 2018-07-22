import { Injectable } from '@angular/core';

import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
// TODO: Ugly --> replace somehow
declare let require: any;
declare let window: any;
declare let web3: any;

// TODO: better path in separate config file
let visaApplicationAbi = require('../../../../blockchain/build/contracts/Visaapplication.json');


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private web3Provider: null;

  constructor() {
    // TODO: Add Metamask support
    // if (typeof window.web3 !== 'undefined') {
    //   this.web3Provider = window.web3.currentProvider;
    // } else {
    // TODO: url in config file
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // }
    window.web3 = new Web3(this.web3Provider);
  }

  getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
          web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account, balance:web3.fromWei(balance, "ether")});
            } else {
              return reject("error!");
            }
          });
        }
      });
    });
  }

  sendVisaApplication(transferFrom: any) {
    let that = this;

    return new Promise((resolve, reject) => {
      let visaApplicationContract = TruffleContract(visaApplicationAbi);
      visaApplicationContract.setProvider(that.web3Provider);
      visaApplicationContract.deployed({
        from: transferFrom,
        gas: 4712388

      }).then(function(instance) {
        return instance.test({ //TODO: call prober method or maybe not needed at all
          from: transferFrom,
          gas: 4712388
        });
        // TODO: Prober resolvement
      }).then(function(status) {
      console.log(status)
      if(status) {
        return resolve({status:true});
      }
    }).catch(function(error){
      console.log(error);

      return reject("Error in test service call");
    });
  });
}
}
