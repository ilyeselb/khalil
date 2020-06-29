import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class MessageService {
    public api = environment .api  + 'mail/' ;

 constructor(private http: HttpClient) { }

  sendMessage(body) {
    return this.http.post(this.api + 'sendmail_newslater', body);
  }
  sendMessage2(body) {
    return this.http.post(this.api + 'sendmail_newslater_nonsubscibed', body);
  }
}