import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { QRScannerPage } from '../qrscanner/qrscanner';
import { NFCReaderPage } from '../nfcReader/nfcReader';
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
              public serv: Service
            ) {

      //QRScanner.prepare(onDone); // show the prompt

  }

  
readNFC(){
  this.navCtrl.push(NFCReaderPage);
  this.id = this.serv.id;
}

readQRcode(){
  this.navCtrl.push(QRScannerPage);
  this.id = this.serv.id;
}  

}
