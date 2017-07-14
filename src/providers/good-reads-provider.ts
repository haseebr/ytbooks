import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as cxml from 'cxml';

/*
  Generated class for the GoodReadsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoodReadsProvider {

    c: any;
    key = "2PxMGlAaFlBPhXLZA79Tg";

    constructor(public http: Http) {
        console.log('Hello GoodReadsProvider Provider');
        this.c = new cxml.Parser();

    }

    search(query) {
        query = encodeURI(query);
        // let url = `https://www.goodreads.com/search/index.xml?key=2PxMGlAaFlBPhXLZA79Tg&q=${query}`;
        let url = `/search/index.xml?key=2PxMGlAaFlBPhXLZA79Tg&q=${query}`;
        console.log(url);
        return new Promise(resolve => {
            this.http.get(url)
                .map(data => data.json())
                .subscribe(data => {
                    // console.log(data);
                    resolve(data);
                })
        })
    }

}
