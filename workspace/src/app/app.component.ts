import {Component, ViewChild} from '@angular/core';
import {Nav,Events, MenuController, Platform,AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SearchPage} from '../pages/search/search';
import {HomePage} from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { Service } from '../providers/service';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TabsPage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public menu: MenuController,
                public events: Events,
                public service: Service,
                public alertCtrl: AlertController) {
        this.initializeApp();
        this.findAll();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    findAll() {
        if (this.service.userInfo !== undefined) {
            return;
        }
          this.service.getUser().subscribe(data => {
              this.service.userInfo = data.json();
              }, error => {
                  this.doAlert("Error!",JSON.stringify(error));
            });
              /*.then(data =>{
                 this.items = data;
                 this.doAlert("Error!",JSON.stringify(this.items));
              })
              .catch(error => alert(error));*/
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
