import { Injectable }       from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }       from 'rxjs/Observable';
import { SecurityService }  from './security.service';
import { User }             from './user.model';

@Injectable()
export class CanActivateRegistration implements CanActivate {
  constructor(private securityService:SecurityService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.securityService.hasRole('domainexpert');
  }
}