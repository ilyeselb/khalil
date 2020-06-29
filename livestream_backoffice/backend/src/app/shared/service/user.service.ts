import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { user } from '../data/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    public api = environment.api + 'user'

    getAll() {
        return this.http.get<user[]>(`${this.api}/getall`);
    }

   
  delete(obj :any ) : Observable<any>{ 
    return this.http.post(this.api+'/delete',obj );
  }
}