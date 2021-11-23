import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: any = environment.apikey;
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];
  public results: Gif[] = [];

  get record() {
    //Break the reference and return a new array
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    // Other way
    // if(localStorage.getItem('record')){
    //   this._record = JSON.parse(localStorage.getItem('record')!);
    // }

    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if(!this._record.includes(query)) {
      this._record.unshift(query);
      this._record = this._record.splice(0,10);
      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams().set('api_key', this.apiKey).set('limit', '10').set('q', query);

    this.http.get<SearchGIFResponse>(`${this.urlService}/search`, {params}).subscribe((resp) => {
      console.log(resp.data)
      this.results = resp.data;
      localStorage.setItem('results', JSON.stringify(this.results));
    });
  }
}
