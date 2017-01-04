import { Injectable }          from '@angular/core';
import { USERS }               from './mock';
import { User }                from './user.model';
import { DecisionSpace }       from '../decisionspace/decisionspace.model';
import { CandidateUser }       from './candidateUser.model';
import { Role }                from './role.model';
import { Observable }          from 'rxjs/Observable';
import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { ConnectorService }    from '../connector/connector.service'
import { Subject }             from 'rxjs/Subject';
import { LocalStorageService } from 'angular-2-local-storage';

//http://stackoverflow.com/questions/33675155/creating-and-returning-observable-from-angular-2-service

export interface Message {
    author: string;
    message: string;
}
@Injectable()
export class SecurityService {
    public messages: Subject<Message>;

    constructor(
        private connectorService:ConnectorService,
        private localStorageService: LocalStorageService
    ) {
        let storedUser:User = <User> this.localStorageService.get('loggedInUser');
        if(storedUser)
            this._loggedInUser.next(storedUser);
    }

    private _loggedInUser:BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public loggedInUser$ = this._loggedInUser.asObservable();

    getCurrentUser() {
        this.localStorageService.get('loggedInUser');
        let user = this._loggedInUser.getValue();
        return user;
    }

    userLogin(user:User): Promise<User> {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.userLogin', [user]).then( (user:User) => {
                this.localStorageService.set('loggedInUser', user);
                this._loggedInUser.next(user);
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }

    userRegistration(user:User): Promise<string> {
        return new Promise( (resolve, reject) => {
            this.connectorService.call('udm.backend.userRegistration', [user]).then((registeredUser:User) => {
                console.log("registeredUser", registeredUser);
                resolve(registeredUser);
            }).catch( (err) => {
                reject(err);
            });
        });
    }   

    userLogout() {
        this.localStorageService.remove('loggedInUser');
        this._loggedInUser.next(null);
    }

    hasRole(...roles) {
        const loggedInUser = this._loggedInUser.getValue();
        if(loggedInUser == null) return false;

        return roles.some( r1 => {
            return loggedInUser.roles.some( r2 => r1 == r2 );
        });
    }

    setLoggedInUser(user:User) {
        this._loggedInUser.next(user);
    }

    getUsers(): Promise<User[]> {
        return Promise.resolve(USERS);
    }

    setAuthentication(user:User) {
        this._loggedInUser.next(user);
    }
}