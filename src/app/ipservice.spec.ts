import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private apiKey = 'SEU_TOKEN_AQUI';
  private baseUrl = 'https://api.invertexto.com/v1/geoip';

  constructor(private http: HttpClient) {}

  localizarIp(ip: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ip}?token=${this.apiKey}`);
  }
}
