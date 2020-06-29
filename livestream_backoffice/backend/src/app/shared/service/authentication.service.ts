import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from '../data/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public api = environment.api  + 'user/' ;
  private currentUserSubject: BehaviorSubject<user>;
  public currentUser: Observable<user>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): user {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string ) {
      return this.http.post<any>(`${this.api}login_admin`, { email, password })
          .pipe(map(users => {
              console.log('users', users);
              
              // login successful if there's a jwt token in the response
              if (users && users.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(users));
                  this.currentUserSubject.next(users);

              }

              return users;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
  registre (obj :any) : Observable<any>{
    console.log(obj);
    return this.http.post(this.api+'register',obj);
  }


  update  (obj :any ) : Observable<any>{
    return this.http.post(this.api+'update',obj );
  }
}
