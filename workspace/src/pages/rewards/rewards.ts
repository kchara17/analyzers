import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import {Service} from "../../providers/service";
import { Injectable } from '@angular/core';

@Component({
    selector: 'page-rewards',
    templateUrl: 'rewards.html'
})
@Injectable()
export class RewardsPage {
  public rewards: Array<any>;
  public pointsPercent: String;
  public pos: number;
  constructor(public navCtrl: NavController,
              public service: Service,
              public alertCtrl: AlertController) {
               this.pointsPercent = "20%";
               this.getAllRewards();
    
  }

  getAllRewards(){
    if (this.service.rewardsInfo !== undefined) {
      this.rewards = this.service.rewardsInfo;
      return;
  }
    this.service.getAllRewards().subscribe(data => {
        this.service.rewardsInfo= data.json()["rewards"];
        
        this.rewards = data.json()["rewards"];
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
