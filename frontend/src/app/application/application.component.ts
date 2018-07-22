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
  profileArray = this._makeProfileArray(this.auth.userProfile);
  transferFrom = '0x0';
  balance ='0 ETH';

  constructor(public auth: AuthService,
    private router: Router,
    private contract: ContractService) {
    this.initAndDisplayAccount();
  }

  ngOnInit() {
    console.log(this.auth.userProfile);
  }

  initAndDisplayAccount = () => {
    let that = this;
    this.contract.getAccountInfo().then(function(acctInfo){
      console.log(acctInfo);
      that.transferFrom = acctInfo.fromAccount;
      that.balance = acctInfo.balance;
    }).catch(function(error){
      console.log(error);
    });
  };

  sendApplication() {
    let that = this;

    this.contract.sendVisaApplication(that.transferFrom).then(function(result){
      console.log(result);
      that.router.navigateByUrl("/confirmation");
    }).catch(function(error){
      console.log(error);
      that.initAndDisplayAccount();
    });
  }

  private _makeProfileArray(obj) {
    const keyPropArray = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keyPropArray.push(key + ': ' + obj[key]);
      }
    }

    return keyPropArray;
  }

}
