import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { TokenService } from "src/app/core/services/token.service";
import { AuthService } from "src/app/core/services/auth.service";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  public canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (
      this.tokenService
        .parseJwt(this.authService.getAuthentication())
        .scopes.includes("ROLE_ADMIN")
    ) {
      return true;
    }
    this.message.error("Access is not allowed");
    return false;
  }
}
