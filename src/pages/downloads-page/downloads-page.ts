import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PlayPage } from '../play-page/play-page'

/**
 * Generated class for the DownloadsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-downloads-page',
    templateUrl: 'downloads-page.html',
    providers: [NativeStorage]
})
export class DownloadsPage {

    data: any = {};
    isDataAvailable: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private ns: NativeStorage
    ) {

        this.reload();
    }

    log(val) {
        console.log(val);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DownloadsPage');
    }

    clear() {
        this.ns.clear().then((data) => {
            console.log("cleared all data");
            this.isDataAvailable = false;
        }, (error) => {
            console.log("error occured", error);
        })
    }

    getPercentage(v) {
        let ret = (v.loaded / v.total) * 100
        return ret;
    }

    playAudio(o) {
        let obj = {
            "thumb": o.thumb,
            "title": o.title,
            "path": o.path
        }
        this.navCtrl.push(PlayPage, obj)
        console.log("pushed", obj);

    }
    reload() {
        this.isDataAvailable = false;
        let all_keys = [];
        let count = 0;
        console.log(this.isDataAvailable);
        // console.log("ret keys");
        this.ns.keys().then((data) => {
            all_keys = data;
            // console.log("success retrieving keys", data);
            for (var i in all_keys) {
                let key = all_keys[i];
                this.ns.getItem(key)
                    .then((result) => {
                        this.data[key] = result;
                        count += 1;
                        console.log("here", key, count, all_keys.length);
                        if (count == all_keys.length) {
                            this.isDataAvailable = true;
                        }
                    }, (error) => {
                        console.log("Error occured", key);
                    })
            }
        },
            (error) => {
                console.log("Error occured retreiving keys");
            })
    }
}
