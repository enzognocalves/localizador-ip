import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, HttpClientModule],
  standalone: true
})
export class HomePage {
  ip: string = '';
  carregando: boolean = false;
  resultado: any = null;
  erro: string = '';

  constructor(private http: HttpClient) {}

  // Método principal de busca
  buscar() {
    if (!this.ip) {
      this.erro = 'Por favor, digite um IP';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.resultado = null;

    // API alternativa que funciona - ipapi.co
    const url = `https://ipapi.co/${this.ip}/json/`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log('Dados recebidos:', data);
        this.resultado = {
          ip: data.ip,
          country: data.country_name,
          country_code: data.country_code,
          region: data.region,
          city: data.city,
          postal_code: data.postal,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone,
          isp: data.org,
          asn: data.asn
        };
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro:', error);
        this.erro = 'Erro ao buscar informações. Verifique o IP.';
        this.carregando = false;
      }
    });
  }

  // Buscar o IP atual do usuário
  buscarMeuIP() {
    this.carregando = true;
    this.erro = '';

    // Primeiro busca o IP público do usuário
    this.http.get('https://api.ipify.org?format=json').subscribe({
      next: (ipData: any) => {
        this.ip = ipData.ip;
        this.buscar(); // Agora busca as informações
      },
      error: (error) => {
        this.erro = 'Erro ao detectar seu IP';
        this.carregando = false;
      }
    });
  }

  // Testar com IPs de exemplo
  testarExemplo(tipo: string) {
    switch(tipo) {
      case 'google':
        this.ip = '8.8.8.8';
        break;
      case 'cloudflare':
        this.ip = '1.1.1.1';
        break;
      case 'brasil':
        this.ip = '200.160.2.3'; // IP da Fapesp
        break;
    }
    this.buscar();
  }

  limpar() {
    this.ip = '';
    this.resultado = null;
    this.erro = '';
  }
}