import { Injectable } from '@angular/core';
import { USERS }      from './mock';
import { User }         from './user.model';
import { DecisionSpace }         from '../decisionspace/decisionspace.model';
import { CandidateUser }         from './candidateUser.model';
import { Role }         from './role.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';
import { ConnectionService } from '../socketFactory/connection.service'

import { Subject } from 'rxjs/Subject';

//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

export interface Message {
    author: string;
    message: string;
}


@Injectable()
export class SecurityService {
    public messages: Subject<Message>;

    constructor(
        //private connectionService:ConnectionService
    ) {
        
    }

    private _selectedUser:BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public selectedUser$ = this._selectedUser.asObservable();

    userRegistration(user:User): Promise<string> {
        return Promise.reject("Not yet implemented");
        /*this.connectionService.call('udm.backend.userRegistration', [user]).then((data) => {
            console.log("data", data);
        }).catch( (err) => {
            console.log("ERROR", err);
        });
        return Promise.resolve("test");*/
    }

    getCurrentUser() {
        let user = this._selectedUser.getValue();
        /*if(!user){
            user = new User();
            user.username = 'anonymous';
        }*/
        return user;
    }

    userLogin(username:string, password:string): Promise<User> {
        return Promise.reject("Not yet implemented");
        //return this.connectionService.call('udm.backend.userLogin', [user]);
    }

    getUsers(): Promise<User[]> {
        return Promise.resolve(USERS);
    }

    setAuthentication(user:User) {
        this._selectedUser.next(user);
    }
}