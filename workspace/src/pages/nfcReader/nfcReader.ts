import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { BinPage } from '../bin/bin';
import {Service} from "../../providers/service";
import { NFC, Ndef } from '@ionic-native/nfc';
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
              private ndef: Ndef,
              public serv: Service)
             {

            /*  this.nfc.addNdefListener(() => {
                console.log('successfully attached ndef listener');
              }, (err) => {
                console.log('error attaching ndef listener', err);
              }).subscribe((event) => {
                console.log('received ndef message. the tag contains: ', event.tag);
                console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
                this.navCtrl.push(BinPage,"1");
                /*let message = this.ndef.textRecord('Hello world');
                this.nfc.share([message]).then(onSuccess).catch(onError);
              });*/

  }

  
  

}
