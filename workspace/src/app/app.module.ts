import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {AlertsPage} from "../pages/alerts/alerts";
import {AccountPage} from "../pages/account/account";
import {NavigationDetailsPage} from "../pages/account/account";
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {BinPage} from '../pages/bin/bin';
import {SearchPage} from '../pages/search/search';
import {QRScannerPage} from '../pages/qrscanner/qrscanner';
import {NFCReaderPage} from '../pages/nfcReader/nfcReader';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Service } from "../providers/service";

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { NFC, Ndef } from '@ionic-native/nfc';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    AlertsPage,
    TabsPage,
    BinPage,
    NFCReaderPage,
    AccountPage,
    QRScannerPage,
    NavigationDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    AlertsPage,
    AccountPage,
    BinPage,
    NFCReaderPage,
    QRScannerPage,
    NavigationDetailsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Service,
    QRScanner,
    Headers,
    NFC,
    Ndef,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
