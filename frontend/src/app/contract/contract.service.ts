import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';

import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;
declare let web3: any;

let visaApplicationAbi = require('../../../../blockchain/build/contracts/Visaapplication.json');


@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:3001/api'; //TODO: Get into extra config file
  private web3Provider: null;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      // TODO: url in config file
      // TODO: replace with infura test network
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
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

  createApplication(application: any) {
    let that = this;
    return that.http.post(`${that.baseUrl}/applications/`,application, {
      headers: new HttpHeaders().set(
        'Authorization', `Bearer ${that.auth.accessToken}`
      )
    });
  }
  createApplicationContract(transferFrom: any, application: any) {
    let visaApplicationContract = TruffleContract(visaApplicationAbi);
    visaApplicationContract.setProvider(this.web3Provider);
    return visaApplicationContract.deployed(application.destination, application.valid_from,application.valid_till,{
      from: transferFrom,
      gas: 4712388
    }).then(function(instance) {
      return instance;
    }).catch(function(error){
      console.log(error);
    });
  }

  // TODO: Not needed in v0.0.1
  // getApplications(){
  //   return this.http.get(`${this.baseUrl}/applications`,
  //     {
  //       headers: new HttpHeaders().set(
  //         'Authorization', `Bearer ${this.auth.accessToken}`
  //       )
  //     }).pipe(
  //       catchError(this._handleError)
  //     );
  //   }

    private _handleError(err: HttpErrorResponse | any) {
      const errorMsg = err.message || 'Unable to retrieve data';
      return throwError(errorMsg);
    }


  }
