import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { MediaPlugin, MediaObject } from '@ionic-native/media'
import { MediaProvider } from '../../providers/media-provider'
import { YoutubeProvider } from '../../providers/youtube-provider'
import { GoodReadsProvider } from '../../providers/good-reads-provider'
import { Platform, LoadingController } from "ionic-angular";

import { YoutubeDownloadModal } from '../youtube-download-modal/youtube-download-modal'

import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Transfer,
        TransferObject,
        File,
        MediaPlugin,
        MediaProvider,
        YoutubeProvider,
        GoodReadsProvider]
})


export class HomePage {

    files = [];
    l: any;
    myInput: any;
    resultsObject: any;

    constructor(public navCtrl: NavController,
        private transfer: Transfer,
        private file: File,
        private media: MediaPlugin,
        private mp: MediaProvider,
        private platform: Platform,
        private yt: YoutubeProvider,
        private lc: LoadingController,
        private jsonp: Jsonp,
        private mc: ModalController,
        private gr: GoodReadsProvider) {

        platform.ready().then(() => {
            this.mp.init(this.file.dataDirectory + "lol.m4a");
        })


    }

    log(val) {
        console.log(val);
    }

    search() {
        this.present();
        this.yt.search2(this.myInput).then(result => {
            if ("undefined" in result) {
                delete result["undefined"];
            }

            this.resultsObject = result;
            this.dismiss();
        })
    }

    //GoodReads Search
    // search() {
    //     this.present();
    //     try {
    //         this.gr.search(this.myInput).then(result => {
    //             console.log(result);
    //         })
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //         this.dismiss();
    //     }
    // }

    openYoutube(video) {
        this.present()
        let url = "https://murmuring-meadow-61264.herokuapp.com/video/"
            + video.key
            + "?callback=JSONP_CALLBACK";

        let videoInfo = {};
        console.log(url);
        this.jsonp.get(url)
            .map(res => res.json())
            .subscribe(result => {
                videoInfo = result;
                this.dismiss();
                let modal = this.mc.create(YoutubeDownloadModal, videoInfo);
                modal.present()
            },
            (err) => {
                console.log("Error:", err);
                this.dismiss();
            })

    }


    present() {
        this.l = this.lc.create({ content: "Loading..." })
        console.log("Showing loader");
        this.l.present();
    }

    dismiss() {
        this.l.dismiss();
        console.log("Dismissing loader");
    }

    download() {
        const fileTransfer: TransferObject = this.transfer.create();
        fileTransfer.onProgress((e) => {
        })
        let url = "https://r4---sn-p5qs7n7l.googlevideo.com/videoplayback?id=6dc1bf9c6d5bd9bf&itag=139&source=youtube&requiressl=yes&mn=sn-p5qs7n7l&pl=20&mv=u&ms=au&ei=_5MUWZzoBs-Q8wTtz6HgAQ&mm=31&ratebypass=yes&mime=audio/mp4&gir=yes&clen=3165156&lmt=1420280054971109&dur=524.584&mt=1494520671&signature=83682D65A0CBEC0BF60EFA7618AE7D564BFA6FEF.399BA9E38B8672F47BBC2167A11E81BDC3231F22&key=dg_yt0&upn=2SADb4xKID0&ip=54.211.159.13&ipbits=0&expire=1494542431&sparams=ip,ipbits,expire,id,itag,source,requiressl,mn,pl,mv,ms,ei,mm,ratebypass,mime,gir,clen,lmt,dur"
        fileTransfer.download(url,
            this.file.dataDirectory + "/lol.m4a").then((e) => {
                console.log(e);
                alert("download successfull");
            }).catch((e) => {
                console.log("DOWNLOAD: ", e)
            })

        // alert(this.file.dataDirectory);
        this.file.listDir(this.file.dataDirectory, '').then((e) => {
            this.files = e;
            console.log(e);
        }).catch((e) => {
            console.log("ERROR: ", e);
        });

        // this.present();
        // console.log("present done");
        // this.yt.search("hello").then(res => {
        //     console.log("result from promise", res);
        //     this.dismiss();
        // });
    }



    play() {

        this.mp.play();
        // this.mo.play();
    }

    pause() {
        this.mp.pause();
    }

    pos() {
        // this.mp.getCurrentPosition().then((position) => {
        //     console.log(position);
        // })
    }

    duration() {
        // console.log(this.mo.getDuration());
    }

}
