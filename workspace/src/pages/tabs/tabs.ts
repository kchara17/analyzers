import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AlertsPage } from '../alerts/alerts';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AlertsPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
