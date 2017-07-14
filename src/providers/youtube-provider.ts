import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YoutubeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YoutubeProvider {

    BASE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"
    BASE_VIDEO_URL = "https://www.googleapis.com/youtube/v3/videos"
    API_KEY = "AIzaSyCfTR41ilGsXXpsonZRGjeNzmpPlbm0W1U";

    result: any;

    constructor(public http: Http) {
    }

    search(keyword) {
        let url = this.BASE_SEARCH_URL
            + "?key="
            + this.API_KEY
            + "&q="
            + keyword
            + "&part=snippet&maxResults=10";

        return new Promise(resolve => {
            this.http.get(url)
                .map(res => res.json())
                .subscribe(res => {
                    this.result = res;
                    resolve(this.result)
                });
        })
    }

    search2(keyword) {
        let url = this.BASE_SEARCH_URL
            + "?key="
            + this.API_KEY
            + "&q="
            + keyword
            + "&part=snippet&maxResults=25";

        let videoIds = [];

        let resultsObject = {};

        return new Promise((resolve) => {
            this.http.get(url)
                .map(res => res.json())
                .subscribe(res => {
                    for (var i in res.items) {
                        let id = res.items[i]["id"]["videoId"];
                        resultsObject[id] = res.items[i]["snippet"]
                        if (res.items[i]["id"].kind == "youtube#video") {
                            videoIds.push(res.items[i]["id"]["videoId"]);
                        }
                    }
                    this.videoData(resultsObject).then(res => {
                        console.log("Final resultsObject", res);
                        resolve(resultsObject);
                    });
                });
        })

    }

    secondsToHms(d) {
        d = Number(d);

        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        return `00${h}`.slice(-2) + ":" + `00${m}`.slice(-2) + ":" + `00${s}`.slice(-2);
    }

    convertISO8601ToSeconds(input) {

        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0, minutes = 0, seconds = 0, totalseconds;

        if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600 + minutes * 60 + seconds;
        }

        return (this.secondsToHms(totalseconds));
    }

    videoData(resultsObject) {
        let all_ids = []
        for (var i in resultsObject) {
            all_ids.push(i);
        }
        let v_url = this.BASE_VIDEO_URL
            + "?id="
            + all_ids.join(',')
            + "&part=contentDetails&key="
            + this.API_KEY

        return new Promise((resolve) => {
            this.http.get(v_url)
                .map(res => res.json())
                .subscribe(res => {
                    for (var i in res.items) {
                        let id = res.items[i]["id"]
                        let duration = res.items[i]["contentDetails"]["duration"];
                        duration = this.convertISO8601ToSeconds(duration);
                        resultsObject[id]["duration"] = duration
                    }
                    resolve(resultsObject);
                })
        })
    }
}
