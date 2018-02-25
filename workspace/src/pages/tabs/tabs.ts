import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { RewardsPage } from '../rewards/rewards';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RewardsPage;
  tab3Root = AccountPage;

  constructor() {

  }
}
