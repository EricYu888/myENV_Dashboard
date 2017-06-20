import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Network {

  private headers: Headers;
  private options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 0
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  public isNetworkAvail() {
    // ping?
    return true;
  }

  public getOfObservable(url: string, preferences?): Observable<any[]> {
    let requestOptions;
    let params = new URLSearchParams();
    if (preferences) {
      for (let key in preferences) {
        params.set(key, preferences[key]);
      }
      requestOptions = { search: params };
    } else {
      requestOptions = this.options;
    }
    return this.http.get(url, requestOptions)
      .map(this.extractData)
      .catch(this.handleErrorToObservable);
  }

  public postOfObservable(url: string, body: any): Observable<any> {
    return this.http.post(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleErrorToObservable);
  }

  public putOfObservable(url: string, body: any): Observable<any> {
    return this.http.put(url, body, this.options)
      .map(this.extractData)
      .catch(this.handleErrorToObservable);
  }

  private handleErrorToObservable(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getOfPromise(url: string, preferences?): Promise<any> {
    let requestOptions;
    let params = new URLSearchParams();
    if (preferences) {
      for (let key in preferences) {
        params.set(key, preferences[key]);
      }
      params.set('v', new Date().getTime().toString());
      requestOptions = { search: params, headers: this.headers };
    } else {
      requestOptions = this.options;
    }
    return this.http.get(url, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorToPromise);
  }

  public postOfPromise(url: string, body: any): Promise<any> {
    return this.http.post(url, body, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorToPromise);
  }

  public putOfPromise(url: string, body: any): Promise<any> {
    return this.http.put(url, body, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorToPromise);
  }

  public delOfPromise(url: string, id: number): Promise<any> {
    let delUrl = `${url}?id=${id}`;
    return this.http.delete(delUrl, { headers: this.headers })
      .toPromise()
      .then(this.extractData)
      .catch(this.handleErrorToPromise);
  }

  private handleErrorToPromise(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }


}
