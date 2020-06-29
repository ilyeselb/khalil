import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { event } from '../data/event';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  public api = environment.api +'transaction/';
  constructor(private http: HttpClient) {
  }
  get( ) : Observable<event[]>{ 
    return this.http.get<event[]>(this.api+'all');
  }
  add(obj :any) : Observable<any>{
    return this.http.post(this.api+'add',obj);
  }

}

