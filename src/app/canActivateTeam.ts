import { Injectable }       from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }       from 'rxjs/Observable';
import { SecurityService }  from './security/security.service';
import { User }             from './security/user.model';
import { DecisionspaceService } from './decisionspace/decisionspace.service';

export class UserToken {}

export class Permissions {
  decisionspace(user: User, id: string): boolean {
    return false;
  }
  adminTasks(user: User): boolean {
    return false;
  }
}

@Injectable()
export class CanActivateDecisionspace implements CanActivate {
  constructor(private permissions: Permissions, private securityService:SecurityService, private decisionspaceService:DecisionspaceService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if(this.securityService.hasRole('admin' || 'domainexpert')) {
      return true;
    } else {
      const userId = (this.securityService.getCurrentUser()) ? this.securityService.getCurrentUser().id : null;
      return this.decisionspaceService.checkPermissions(userId, parseInt(route.params['id']));
    }
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