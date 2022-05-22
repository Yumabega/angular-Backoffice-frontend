import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { UserI } from '@shared/models/user-i.model';
import { mockUsers } from '@shared/mocks/mock-authentication'; 
import { ReceptionCardI } from '@shared/models/reception-card-i.model';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // array in local storage for registered users
    let users: UserI[] = JSON.parse(localStorage.getItem('users') || '{}') || {
      id: 0,
      email: '',
      name: '',
      surname: '',
      username: '',
    };

    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(
          mergeMap(() => {
            // fake authenticate api end point
            
            if (
              request.url.endsWith('api/authenticate/login') &&
              request.method === 'POST'
              ) {
                let params = request.body;
                console.log(params);

              // check user credentials and return fake jwt token if valid
              let found: UserI = mockUsers.find((user: UserI) => {
                return params.networkUser === user.username;
              })!;
              if (found) {
                if (params.password === found.password) {
                  const myDate: Date = new Date();
                  myDate.setMinutes( myDate.getMinutes() + 60 );
                  
                  return of(
                    new HttpResponse({
                      status: 200,
                      body: { token: `
                      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkphdmllciIsInN1cm5hbWUiOiJNb2xpbmEiLCJlbWFpbCI6Imphdmllci5tb2xpbmFAZGF2aXZpZW5kYS5jb20iLCJ1c2VybmFtZSI6Imphdmllci5tb2xpbmEiLCJwYXNzd29yZCI6IkphdmllcjEyMyJ9.24YtBfrb11dI-FW8JN2gk_q0c3psB1lNHGJ7CfovW94
                      `, user: found,
                        setCookie:{expires: myDate}  },
                    })
                  );
                } else {
                  return throwError(()=> ({
                    status: 2,
                    message: 'Contraseña incorrecta',
                  }));
                }
              } else {
                return throwError(()=>({
                  status: 1,
                  message: 'Usuario Inválido',
                }));
              }
            }

            if (
              request.url.endsWith('api/authenticate/logout') &&
              request.method === 'POST'
            ) {
              return of(new HttpResponse({ status: 200, body: true }));
            }
            if (
              request.url.endsWith('api/reception/') &&
              request.method === 'GET'
            ) {
              let cards: ReceptionCardI[] = [
                {
                    codigoAplicativo: 1,
                    nombreAplicativo: 'estadistico_dian',
                    descripcionAplicativo: 'estadistico DIAN',
                    estado: true,
                    pathLogo: './../../../assets/images/dian-recepcion.jpg',
                },
                {
                  codigoAplicativo: 2,
                  nombreAplicativo: 'estadistico_SHD',
                  descripcionAplicativo: 'estadístico SHD',
                  estado: true,
                  pathLogo: './../../../assets/images/estadistico_distrital.jpg',
                },
                {
                  codigoAplicativo: 3,
                  nombreAplicativo: 'ventanilla',
                  descripcionAplicativo: 'Pagos Ventanilla',
                  estado: true,
                  pathLogo: './../../../assets/images/ventanilla-recepcion.jpg',
                },
                {
                  codigoAplicativo: 4,
                  nombreAplicativo: 'adhesivos',
                  descripcionAplicativo: 'Adhesivos',
                  estado: true,
                  pathLogo: './../../../assets/images/adhesivo-recepcion.jpg',
                },
                {
                  codigoAplicativo: 4,
                  nombreAplicativo: 'adhesivos',
                  descripcionAplicativo: 'Adhesivos',
                  estado: true,
                  pathLogo: './../../../assets/images/dian-recepcion.jpg',
                },
                {
                  codigoAplicativo: 4,
                  nombreAplicativo: 'adhesivos',
                  descripcionAplicativo: 'Adhesivos',
                  estado: true,
                  pathLogo: './../../../assets/images/dian-recepcion.jpg',
                },
                
              ]      
              return of(new HttpResponse({ status: 200, body: cards }));
            }

            // pass through any requests not handled above
            return next.handle(request);
          })
        )

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize())
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};