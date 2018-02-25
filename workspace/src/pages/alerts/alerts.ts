import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import {Service} from "../../providers/service";
import { Injectable } from '@angular/core';

@Component({
    selector: 'page-alerts',
    templateUrl: 'alerts.html'
})
@Injectable()
export class AlertsPage {

  constructor(public navCtrl: NavController,
              public service: Service,
              public alertCtrl: AlertController) {

               this.getAllRewards();
    
  }

  getAllRewards(){
    this.doAlert("test","test");
    if (this.service.rewardsInfo !== undefined) {
      this.doAlert("Loaded","Data is loaded");
      return;
  }
    this.service.getAllRewards().subscribe(data => {
        this.service.rewardsInfo= data.json();
        this.doAlert("success","success");
        }, error => {
            this.doAlert("Error!",JSON.stringify(error));
      });
}

  doAlert(title: string, message: string) {

    let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['OK']
    });
    alert.present();
}

}
