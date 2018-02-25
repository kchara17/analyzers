import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BinPage } from '../bin/bin';
import {Service} from "../../providers/service";
import { NFC } from '@ionic-native/nfc';
@Injectable()
@Component({
  selector: 'page-nfcReader',
  templateUrl: 'nfcReader.html'
})
export class NFCReaderPage {

  constructor(public navCtrl: NavController,
              public config: Config,
              public alertCtrl: AlertController,
              private nfc: NFC, 
              public serv: Service)
             {

              
  }

  ionViewDidEnter() {
    this.nfc.enabled().then((resolve) => {
      this.addListenNFC();
    }).catch((reject) => {
      alert("NFC is not supported by your Device");
    });
  }

  addListenNFC() {

    this.nfc.addTagDiscoveredListener().subscribe(data => {
      if (data && data.tag && data.tag.id) {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        if (tagId) {
          this.navCtrl.push(BinPage,"1");
        } else {
          this.doAlert("Error",'NFC_NOT_DETECTED');
        }
      }
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
