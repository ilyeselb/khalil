import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { event } from '../data/event';
import { abonnement } from '../data/abonnement ';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {


  public api = environment.api +'abonnement/';
  constructor(private http: HttpClient) {
  }
  get( ) : Observable<abonnement[]>{
    console.log    (this.http.get<abonnement[]>(this.api+'all'));
    
    return this.http.get<abonnement[]>(this.api+'all');
  }
  add(obj :any) : Observable<any>{
    return this.http.post(this.api+'add',obj);
  }

  addimage(obj :any) : Observable<any>{
    return this.http.post(this.api+'images',obj);
  }
  update(obj :any ) : Observable<any>{
    return this.http.post(this.api+'update',obj );
  }

  delete(obj :any ) : Observable<any>{ 
    return this.http.post(this.api+'delete',obj );
  }
  deletefile(obj :any ) : Observable<any>{ 
    return this.http.post(this.api+'deletefile',obj );
  }
}

