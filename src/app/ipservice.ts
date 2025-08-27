import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private apiKey = '21423|wguA3jGvi2lJZkW4CzYe9eAVC5mw9fwW'; // coloque seu token aqui
  private baseUrl = 'https://api.invertexto.com/v1/geoip';

  constructor(private http: HttpClient) {}

  localizarIp(ip: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ip}?token=${this.apiKey}`);
  }
}
