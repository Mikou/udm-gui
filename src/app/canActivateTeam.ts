import { Injectable }       from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }       from 'rxjs/Observable';
import { SecurityService }  from './security/security.service';
import { User }             from './security/user.model';

export class UserToken {}

export class Permissions {
  decisionspace(user: User, id: string): boolean {
    console.log(user);
    return false;
  }
  adminTasks(user: User): boolean {
    console.log(user);
    console.log("ADMIN PERMISSION");
    return false;
  }
}

@Injectable()
export class CanActivateDecisionspace implements CanActivate {
  constructor(private permissions: Permissions, private securityService:SecurityService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return this.securityService.hasRole('domainexpert');
  }
}

@Injectable()
export class CanActivateAdminTeam implements CanActivate {
  constructor(private permissions: Permissions, private securityService:SecurityService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    console.log("OK");
    return this.permissions.adminTasks(this.securityService.getCurrentUser());
  }
}