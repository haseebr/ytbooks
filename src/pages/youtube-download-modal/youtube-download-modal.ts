import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';



/**
 * Generated class for the YoutubeDownloadModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-youtube-download-modal',
    templateUrl: 'youtube-download-modal.html',
    providers: [Transfer,
        TransferObject,
        File,
        NativeStorage,
        Toast]
})
export class YoutubeDownloadModal {

    private videoInfo: any;
    private downloadInfo: any = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private vc: ViewController,
        private transfer: Transfer,
        private file: File,
        private ns: NativeStorage,
        private toast: Toast) {

        this.videoInfo = navParams.data;
        for (var i in this.videoInfo.formats) {
            if (this.videoInfo.formats[i]["format"].includes("audio only")) {
                let size = this.videoInfo.formats[i].filesize;
                size = Math.round((size / (1024 * 1024)) * 100) / 100
                let d = {
                    "format": this.videoInfo.formats[i].format,
                    "extension": this.videoInfo.formats[i].ext,
                    "size": size,
                    "url": this.videoInfo.formats[i].url
                }
                this.downloadInfo.push(d);
            }
        }

        console.log(this.downloadInfo);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad YoutubeDownloadModal');
    }

    dismiss() {
        this.navCtrl.pop();
    }

    updateProgress(videoInfo, e, path) {
        let id = videoInfo.id;
        let duration = videoInfo.duration;
        let title = videoInfo.title;
        this.ns.setItem(id,
            {
                progress: e,
                path: path,
                title: title,
                duration: duration,
                thumb: videoInfo.thumbnail
            }).then((data) => {
                if (e.loaded == e.total) {
                    this.toast.show("Download successful", '2000', 'center')
                        .subscribe(toast => {
                            console.log(toast);
                        })
                }
            }, (error) => {
                console.log(error)
            });
    }

    downloadYoutube(downloadInfo) {
        const ft: TransferObject = this.transfer.create();


        let path = this.file.dataDirectory
            + this.videoInfo.id
            + "."
            + downloadInfo.extension

        console.log(downloadInfo, path);

        this.toast.show("Download Started", '500', 'center')
            .subscribe(toast => {
                console.log(toast);
            })

        ft.onProgress((e) => {
            this.updateProgress(this.videoInfo, e, path)
        })

        ft.download(downloadInfo.url, path)
            .then((e) => {
            })
            .catch((e) => {
                console.log("Download Failed", e);
            });
    }
}
