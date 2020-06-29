import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { event } from '../data/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  public api = environment.api +'event/';
  constructor(private http: HttpClient) {
  }
  get( ) : Observable<event[]>{
    console.log    (this.http.get<event[]>(this.api+'all'));
    return this.http.get<event[]>(this.api+'all');
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

