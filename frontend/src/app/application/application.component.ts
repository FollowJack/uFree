import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { ContractService } from './../contract/contract.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  balance : string;
  application : any = {};


  constructor(public auth: AuthService,
    private router: Router,
    private contract: ContractService) {
    this.initAndDisplayAccount();
  }

  ngOnInit() {
    this.balance = '0';
  }

  initAndDisplayAccount(){
    let that = this;

    // TODO: Not in this version 0.0.1 - get eisiting applications
    // this.contract.getApplications().subscribe((data:  Array<object>) => {
    //   this.application  =  data[0]; //TODO check application for public address
    //   console.log(data);
    //   this.application.birthdate = this._parseDate(this.application.birthdate)
    //   this.application.valid_from = this._parseDate(this.application.valid_from)
    //   this.application.valid_till = this._parseDate(this.application.valid_till)
    // });

    this.contract.getAccountInfo().then((acctInfo: any) => {
      that.application.public_address = acctInfo.fromAccount;
      that.balance = acctInfo.balance;
    }).catch(function(error){
      console.log(error);
    });
  }

  sendApplication() {
    let that = this;

    this.contract.createApplicationContract(that.application.public_address, that.application)
    .then(contract => {
      that.application.contract_address = contract.address;
      that.contract.createApplication(that.application).subscribe((application) => {
        console.log(application);
        that.router.navigateByUrl("/confirmation");
      });
    }).catch(function(error){
      console.log(error);
      that.initAndDisplayAccount();
    });
  }


  // TODO: Not needed in v0.0.1
  // private _parseDate(date) {
  //   date = new Date(date);
  //   let result;
  //
  //   var year = date.getFullYear();
  //   var month = date.getMonth()+1;
  //   var day = date.getDate();
  //
  //   if (day < 10) {
  //     day = '0' + day;
  //   }
  //   if (month < 10) {
  //     month = '0' + month;
  //   }
  //
  //   // target format is yyyy-mm-dd
  //   result = year + '-' + month + '-' + day
  //   console.log(result);
  //   return result;
  // }

}
