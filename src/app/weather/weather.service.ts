import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Info } from './info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {

  constructor(private http: Http) {

  }



  public getCurrentWeatherByCity(city) {
    let currentCity = null;
    let beijing = {
      temp: "30",
      weather: "Rain",
      wet: "73",
      pic: "leftImg icon iconfont icon-rain",
      psi: "30",
      rain: "10"
    }
    let shanghai = {
      temp: "35",
      weather: "Sun",
      wet: "80",
      pic: "leftImg icon iconfont icon-sun",
      psi: "25",
      rain: "0"
    }
    let dalian = {
      temp: "28",
      weather: "Cloudy",
      wet: "90",
      pic: "leftImg icon iconfont icon-cloudy2",
      psi: "32",
      rain: "0"
    }

    if (city === "beijing") {
      currentCity = beijing;
    }
    else if (city === "shanghai") {
      currentCity = shanghai;
    }
    else {
      currentCity = dalian;
    }
    return currentCity;

  }



}