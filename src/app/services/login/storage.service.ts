import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionI } from '@shared/models/session-i.model'; 
import { UserI } from '@shared/models/user-i.model'; 
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private currentSession: SessionI = {
    token: '',
    user: { id: 0, email: '', name: '', surname: '', username: '' },
    setCookie: {}
  };
  private localStorageService;
  constructor(private router: Router,
    private cookieService: CookieService) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  private getCurrentSession(): SessionI {
    return this.currentSession;
  }

  private getCurrentToken(): string {
    var session = this.getCurrentSession();
    return session && session.token ? session.token : '';
  }

  private loadSessionData(): SessionI {
    var sessionStr = this.cookieService.get('currentUser');
    // var sessionStr = this.localStorageService.getItem('currentUser');
    // return sessionStr
    //   ? <SessionI>JSON.parse(sessionStr)
    //   : {
    //       token: '',
    //       user: { id: 0, email: '', name: '', surname: '', username: '' },
    //     };
    return sessionStr
      ? <SessionI>JSON.parse(sessionStr)
      : {
          token: '',
          user: { id: 0, email: '', name: '', surname: '', username: '' },
        };
    
  }

  private logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }

  private removeCurrentSession(): void {
    // this.localStorageService.removeItem('currentUser');
    // this.currentSession = {
    //   token: '',
    //   user: { id: 0, email: '', name: '', surname: '', username: '' },
    // };
    this.cookieService.delete('currentUser');
    this.currentSession = {
      token: '',
      user: { id: 0, email: '', name: '', surname: '', username: '' },
    };
  }

  getCurrentUser(): UserI {
    var session: SessionI = this.getCurrentSession();
    return session && session.user
      ? session.user
      : { id: 0, email: '', name: '', surname: '', username: '' };
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() != '' ? true : false;
  }

  setCurrentSession(session: SessionI): void {
    this.currentSession = session;

    // this.localStorageService.setItem('currentUser', JSON.stringify(session));
    console.log('seteando los datos', session.setCookie?.expires);
    
    this.cookieService.set('currentUser',  JSON.stringify(session), { expires: session.setCookie?.expires });
  }
}
