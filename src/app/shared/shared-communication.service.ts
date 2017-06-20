import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { KeyVal } from './action-do';
@Injectable()
export class CommunicationService {
  private configList: Subject<any> = new BehaviorSubject<any>(null);
  private checkList: Subject<any> = new BehaviorSubject<any>(null);
  constructor() {
    // TODO
  }

  // used for configlist
  public publishConfiglistOfData(newData: KeyVal): void {
    this.configList.next(newData);
  }

  public listenOnConfiglistDataChanged(onDataChanged: (newData: KeyVal) => void): Subscription {
    return this.configList.subscribe({
      next: (u) => {
        if (u !== null) {
          onDataChanged(u);
        }
      }
    });
  }

  public unlistenConfiglist() {
    this.configList.unsubscribe();
  }

  // used for checklist
  public publishChecklistOfData(newData: any): void {
    this.checkList.next(newData);
  }

  public listenOnChecklistDataChanged(onDataChanged: (newData: any) => void): Subscription {
    return this.checkList.subscribe({
      next: (u) => {
        if (u !== null) {
          onDataChanged(u);
        }
      }
    });
  }

  public unlistenChecklist() {
    this.checkList.unsubscribe();
  }

}

