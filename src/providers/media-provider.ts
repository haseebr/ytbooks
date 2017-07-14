import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { MediaPlugin, MediaObject } from '@ionic-native/media'
import { File } from "@ionic-native/file"

import 'rxjs/add/operator/map';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaProvider {

    mediaObject: MediaObject;

    onStatusUpdate = (status) => console.log(status);
    onSuccess = () => console.log("Action is successful");
    onError = (error) => console.error("Error playing", error.message);

    currPosition = 0;

    constructor() { }

    init(path) {
        let media = new MediaPlugin()
        this.mediaObject = media.create(path,
            this.onStatusUpdate,
            this.onSuccess,
            this.onError)
    }
    play() {
        console.log(this.mediaObject);
        if (this.mediaObject) {
            this.mediaObject.play()
        } else {
            console.log("mediaObject no initialized");
        }
    }

    get() {
        return this.mediaObject.getCurrentPosition();
    }
    getDuration() {
        if (this.mediaObject) {
            this.mediaObject.getCurrentPosition().then((d) => {
                console.log(d);
                return d;
            })
        }
    }

    seekTo(time) {
        this.mediaObject.seekTo(time);
    }

    pause() {
        if (this.mediaObject) {
            this.mediaObject.getCurrentPosition().then((position) => {
                this.currPosition = position;
            })
            console.log("Current position is ", this.currPosition)
            this.mediaObject.pause();
        }
    }

}
