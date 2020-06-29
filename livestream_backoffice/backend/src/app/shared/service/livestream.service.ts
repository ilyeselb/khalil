import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LivestreamService {


  public api = environment.api +'stream/';
  constructor(private http: HttpClient) {
  }
 
  createlive() : Observable<any>{
    return this.http.post(this.api+'createstream',{});
  }

}

