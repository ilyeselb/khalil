import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { informations } from '../data/informations';
import { logo } from '../data/logo';


@Injectable({
  providedIn: 'root'
})
export class InformationsService {


  public api = environment.api +'informations/';
  constructor(private http: HttpClient) {
  }
  get( ) : Observable<informations[]>{ 
    return this.http.get<informations[]>(this.api+'all');
  }
  getlogo( ) : Observable<logo[]>{ 
    return this.http.get<logo[]>(this.api+'all_logo');
  }
  add(obj :any) : Observable<any>{
    return this.http.post(this.api+'add',obj);
  }
  addimage(obj :any) : Observable<any>{
    return this.http.post(this.api+'images',obj);
  }
  addimagelogo(obj :any) : Observable<any>{
    return this.http.post(this.api+'images_logo',obj);
  }
  
  delete(obj :any ) : Observable<any>{ 
    return this.http.post(this.api+'delete',obj );
  }
  deletelogo(obj :any ) : Observable<any>{ 
    return this.http.post(this.api+'delete_logo',obj );
  }
}
