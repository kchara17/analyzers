import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { QRScannerPage } from '../qrscanner/qrscanner';
import {Service} from "../../providers/service";
@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public id: string;
  constructor(public navCtrl: NavController,
              public config: Config,
              public alertCtrl: AlertController,
              private qrScanner: QRScanner,
              public serv: Service
            ) {

      //QRScanner.prepare(onDone); // show the prompt

  }

  
readNFC(){
  this.navCtrl.push(QRScannerPage);
  this.id = this.serv.id;
}

  

}
