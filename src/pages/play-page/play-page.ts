import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { MediaPlugin, MediaObject } from '@ionic-native/media'
import { MediaProvider } from '../../providers/media-provider'
import { File } from '@ionic-native/file';
import { Platform, LoadingController } from "ionic-angular";

/**
 * Generated class for the PlayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-play-page',
    templateUrl: 'play-page.html',
    providers: [Transfer,
        TransferObject,
        File,
        MediaPlugin,
        MediaProvider]
})
export class PlayPage {

    title: any;
    thumb: any;
    path: any;
    isPlaying: any;
    currentDuration: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public mp: MediaProvider,
        private platform: Platform) {

        this.title = this.navParams.get("title");
        this.thumb = this.navParams.get("thumb");
        this.path = this.navParams.get("path");

        console.log(this.title, this.thumb, this.path);
        platform.ready().then(() => {
            this.mp.init(this.path);
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PlayPage');
    }

    setDuration() {
        let a = this.mp.getDuration();
        this.currentDuration = a;
        console.log("Current position", a);
    }

    play() {
        this.isPlaying = true;
        this.mp.play();
        setInterval(() => {
            this.mp.get().then((d) => {
                this.currentDuration = d;
            })
        }, 1000);
    }

    pause() {
        this.isPlaying = false;
        this.mp.pause();
    }

    forward() {
        let seekTo = this.currentDuration * 1000 + 10000
        this.mp.seekTo(seekTo)
    }

    backward() {
        let seekTo = this.currentDuration * 1000 - 10000
        if (seekTo > 0) {
            this.mp.seekTo(seekTo)
        }
    }
}
