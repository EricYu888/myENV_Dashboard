
import { Injectable, ViewContainerRef } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {

  public _state: InternalStateType = {};
  private cityChange: Subject<any> = new BehaviorSubject<any>(null);
  // already return a clone of the current state
  public get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }

  public CityChanged(cate: string) {
    this.cityChange.next(cate)
  }

  public registerCityChangeListener(onChanged: (data: string) => void): Subscription {
    return this.cityChange.subscribe({
      next: (u) => {
        if (u !== null) {
          onChanged(u);
        }
      }
    });
  }

  public unregisterCityListener() {
    try {
      this.cityChange.unsubscribe();
    } catch (error) {

    }
  }
}
