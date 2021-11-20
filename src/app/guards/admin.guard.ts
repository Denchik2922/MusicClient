import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { ACCESS_TOKEN_KEY } from "../services/auth.service";


 
export class AdminGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        let token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if(token != null){
            let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
            return decodedJWT.role?.toLowerCase() == 'admin';
        }
        return false;
    }
}

