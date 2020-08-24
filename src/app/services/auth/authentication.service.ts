import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { map,retry, catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import * as sjcl from 'sjcl';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public usuario: Usuario;
    private currentUserSubject: BehaviorSubject<Usuario>;
    public currentUser: Observable<Usuario>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Usuario {
        return this.currentUserSubject.value;
    }

    public get currentUserValueDecrypt(): Usuario {
        try {
            return JSON.parse(sjcl.decrypt(environment.EncryptPassword, localStorage.getItem('user')));
        }
        catch (e) {
            return null;
        }
    }

    public hasSession() {
        const s = localStorage.getItem('user');
        if (s) {
            return true;
        }
        return false;
    }
    public updateUser(u: Usuario) {
        this.currentUserSubject.next(u);
        localStorage.setItem('user', sjcl.encrypt(environment.EncryptPassword, JSON.stringify(u)));
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }

    clearUser() {
        localStorage.clear();
    }


    login(model): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get(environment.URLS.API_URL + '/painel/ws/users.php?auth=AKur0On8iWjP2OmasopsZA&user=' + model.login + '&password=' + model.password).pipe(map(user => {
   
            this.usuario = new Usuario();
            let item = user[0];
            if (item) {
                this.usuario.app_id = item.app_id;
                this.usuario.user_bio = item.user_bio;
                this.usuario.user_cell = item.user_cell;
                this.usuario.user_cnpj = item.user_cnpj;
                this.usuario.user_cpf = item.user_cpf;
                this.usuario.user_email = item.user_email;
                this.usuario.user_facebook = item.user_facebook;
                this.usuario.user_id = +item.user_id;
                this.usuario.user_ig = item.user_ig;
                this.usuario.user_lastname = item.user_lastname;
                this.usuario.user_lastupdate = item.user_lastupdate;
                this.usuario.user_level = +item.user_level;
                this.usuario.user_login = item.user_login;
                this.usuario.user_logo = item.user_logo;
                this.usuario.user_name = item.user_name;
                this.usuario.user_newpass = item.user_newpass;
                this.usuario.user_password = item.user_password;
                this.usuario.user_registration = item.user_registration;
                this.usuario.user_stats = item.user_stats;
                this.usuario.user_telephone = item.user_telephone;
                this.usuario.user_thumb = item.user_thumb;
                this.usuario.user_twitter = item.user_twitter;
                this.usuario.user_type = item.user_type;

                this.currentUserSubject.next(this.usuario);
                localStorage.setItem('user', sjcl.encrypt(environment.EncryptPassword, JSON.stringify(user)));
                
            }
            return this.usuario;
        })).pipe(catchError(this.handleError.bind(this)));
    }

    // login(model): Observable<any> {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         }),
    //     };
    //     return this.http.get(environment.URLS.API_URL + '/painel/ws/users.php?auth=AKur0On8iWjP2OmasopsZA&user=' + model.login + '&password=' + model.password).pipe(
    //         retry(2),
    //         catchError(this.handleError)
    //       );
    // }

    EsqueceuSenha(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"
            }),
        };
        return this.http.get(environment.URLS.API_URL + '/painel/mail/forget.php?auth=AKur0On8iWjP2OmasopsZA&mail=' + model.email,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    
    TracarLogin(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.get('https://horadolixo.ml/gps/?token=f9IPMcP3j9l8OpruhpjrNK8xHRHrCaum', { headers, responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        //var myJSON = JSON.stringify(errorResponse);
        //alert("ERRO");
       // alert(errorResponse.ToString());
       //alert(myJSON);
        if (errorResponse.error instanceof ErrorEvent) {
           // alert(errorResponse.error.message);
            console.log('Erro no lado do cliente :', errorResponse.error.message);
        } else {
          //  alert(errorResponse);
            console.log('Erro no lado do servidor :', errorResponse);
        }

        return throwError('H� um problema com o servi�o. Somos notificados e estamos trabalhando nele. Tente novamente mais tarde.');
    }
}