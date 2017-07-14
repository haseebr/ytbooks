import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js";

/*
  Generated class for the GoodReadsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()

// class SearchResult {
//     title: string;
//     author: string;
//     image_url: string;
//     j: any;

//     constructor(jsonObject: any) {
//         this.j = jsonObject;
//         this.title = this.j.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0];
//         this.author = this.j.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0];
//         this.image_url = this.j.GoodreadsResponse.search[0].results[0].work[0].best_book[0].image_url[0];
//     }
// }
export class GoodReadsProvider {

    c: any;
    key = "2PxMGlAaFlBPhXLZA79Tg";

    constructor(public http: Http) {
        console.log('Hello GoodReadsProvider Provider');

    }

    search(query) {
        query = encodeURI(query);
        // let url = `https://www.goodreads.com/search/index.xml?key=2PxMGlAaFlBPhXLZA79Tg&q=${query}`;
        let url = `/search/index.xml?key=2PxMGlAaFlBPhXLZA79Tg&q=${query}`;
        console.log(url);
        return new Promise(resolve => {
            this.http.get(url)
                // .map(data => data.json())
                .subscribe(data => {
                    xml2js.parseString(data.text(), (err, result) => {
                        resolve(result);
                        // console.log(result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0])
                        // console.log(result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0])
                        // console.log(result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].image_url[0])
                    })
                })
            // resolve(data.text());
        })
    }
}
