import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';

export interface Email{
    email: string;
    assunto: string;
    mensagem: string;
}

@Injectable({
    providedIn: 'root'
})

export class EmailService {

    private apiUrl = `${environment.apiUrl}/email`;

    constructor(private http: HttpClient) { }

    sendEmail(email: Email) {
        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': `${environment.apiKey}`
        });
        return this.http.post(this.apiUrl, email, { headers });
    }
}