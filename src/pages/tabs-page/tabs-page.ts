import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { DownloadsPage } from '../downloads-page/downloads-page';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-tabs-page',
    templateUrl: 'tabs-page.html',
})
export class TabsPage {

    tab1Root = DownloadsPage;
    tab2Root = HomePage;

    constructor() {

    }

}
