import { Component } from '@angular/core';

import {Config, NavController,NavParams,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import {Service} from "../../providers/service";
import { HomePage } from '../home/home';
@Injectable()
@Component({
  selector: 'page-bin',
  templateUrl: 'bin.html'
})
export class BinPage {
  public id: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: Config,
              public alertCtrl: AlertController,
              public serv: Service
            ) {
      this.id = navParams.data; 
      this.findBinInfo();       
      //QRScanner.prepare(onDone); // show the prompt

  }

  findBinInfo() {
    if (this.serv.binInfo !== undefined) {
        return;
    }
      this.serv.getBinInfo(this.id).subscribe(data => {
          this.serv.binInfo = data.json();
          }, error => {
              this.doAlert("Error!",JSON.stringify(error));
        });
          /*.then(data =>{
             this.items = data;
             this.doAlert("Error!",JSON.stringify(this.items));
          })
          .catch(error => alert(error));*/
}

showBinInformation(){
  this.doAlert("Bin Type",this.serv.binInfo["type"]);
}

report(problem: string){

  this.serv.postProblem(problem);
  this.doAlert("Thank you!", "Your feedback has been submitted!");
  this.navCtrl.setRoot(HomePage);
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
