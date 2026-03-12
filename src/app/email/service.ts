import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Email{
    email: string;
    assunto: string;
    mensagem: string;
}

@Injectable({
    providedIn: 'root'
})

export class EmailService {

    constructor() { }

    sendEmail(email: Email) {
        // no backend API available anymore; use mailto link
        const to = encodeURIComponent("brunoeuflausino@gmail.com");
        const subject = encodeURIComponent(email.assunto);
        const body = encodeURIComponent(email.mensagem);
        const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
        // open default mail client
        window.location.href = mailto;
        // return an observable for compatibility with existing callers
        // using rxjs `of` to emit a void value immediately
        return of<void>(undefined);
    }
}