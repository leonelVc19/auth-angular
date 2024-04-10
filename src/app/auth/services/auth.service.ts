import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';
import { AuthStatus, LoginResponse, User } from '../interfaces';

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

  constructor() { };

  //signals
  login( email: string, password: string ): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap( ({ user, token }) => {
          this._currenyUser.set( user );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', token);
          console.log({ user, token });

        }),
        map( () => true )
        // Todo: errores
      );
  }
}
