import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './models/user';
@Injectable()
export class MainService {
    public currentUser: Subject<User> = new BehaviorSubject<User>(null);
    constructor() {
        // TODO
    }

    public setCurrentUser(newUser: any): void {
        this.currentUser.next(newUser);
    }

}

