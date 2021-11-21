import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _record: string[] = [];

  get record() {
    //Break the reference and return a new array
    return [...this._record];
  }

  searchGifs(query: string) {
    this._record.unshift(query);

    console.log(this._record);
  }
}
