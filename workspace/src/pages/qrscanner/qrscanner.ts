import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { BinPage } from '../bin/bin';
import {Service} from "../../providers/service";
@Injectable()
@Component({
  selector: 'page-qrscanner',
  templateUrl: 'qrscanner.html'
})
export class QRScannerPage {

  constructor(public navCtrl: NavController,
              public config: Config,
              public alertCtrl: AlertController,
              private qrScanner: QRScanner,
              public serv: Service)
             {

              this.qrScanner.prepare()
              .then((status: QRScannerStatus) => {
                 if (status.authorized) {
                   // camera permission was granted
            
                   
                   // start scanning
                   let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                     console.log('Scanned something', text);
                     this.serv.id = text;
                     this.qrScanner.hide(); // hide camera preview
                     scanSub.unsubscribe(); // stop scanning
                     this.navCtrl.push(BinPage,text)
                   });
            
                   // show camera preview
                   this.qrScanner.show();
            
                   // wait for user to scan something, then the observable callback will be called
            
                 } else if (status.denied) {
                   // camera permission was permanently denied
                   // you must use QRScanner.openSettings() method to guide the user to the settings page
                   // then they can grant the permission from there
                 } else {
                   // permission was denied, but not permanently. You can ask for permission again at a later time.
                 }
              })
              .catch((e: any) => console.log('Error is', e));

  }

  
  

}
