import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from 'app/services/login/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate() {
    console.log(this.storageService.isAuthenticated(), 'Esta autenticado');
    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
  
}
