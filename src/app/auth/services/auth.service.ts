import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { UserRegister } from '../interfaces/user-register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  private _currenyUser = signal<User | null>( null );
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );
  //! al mundo exterior
  public currentUser = computed( () => this._currenyUser() ); //forma de hacerlo publico
  public authStatus = computed( () => this._authStatus() );
  //es lo unico que se expone



  constructor() {
    this.checkAuthStatus().subscribe();
  };


  private setAuthentication( user: User, token: string ): boolean { // Don't repeate YourSelf
    this._currenyUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
    return true;
  }

  //signals
  login( email: string, password: string ): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( ({ user, token }) => this.setAuthentication(user, token),
          // Todo: errores
          catchError( error => throwError( () => error.message))
        )
      );
  };

  register( name: string, email: string, password: string ): Observable<boolean>  {

    const url = `${this.baseUrl}/auth/register`;
    const body = { name, email, password };
    const data = this.http.post<UserRegister>(url, body)
      .pipe(
        map( ({user, token}) => this.setAuthentication( user, token )),
        //en caso de error.
        catchError( error => throwError( () => error ) )
      )
    return data;
  };

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token =  localStorage.getItem('token');

    if( !token ) {
      this.logout()
      return of(false);
    }
    const headers =  new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

    return this.http.get<CheckTokenResponse>(url, { headers})
      .pipe(
        map( ({token, user}) => this.setAuthentication(user, token)),
        //Error
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated);
          return of(false)
        })
      )
  };

  logout() {
    localStorage.removeItem('token');
    this._currenyUser.set( null )
    this._authStatus.set( AuthStatus.notAuthenticated )
  }
};
