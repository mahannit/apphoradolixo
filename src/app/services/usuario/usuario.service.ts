import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    constructor(private httpClient: HttpClient) { }

    Cadastrar(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.post('https://horadolixo.ml/_ws/createUsers.php?auth=AKur0On8iWjP2OmasopsZA',model,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    CadastrarEndereco(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.httpClient.post('https://horadolixo.ml/_ws/createAddress.php?auth=AKur0On8iWjP2OmasopsZA',model,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    ConsultarCEP(cep: string): Observable<any> {
 
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    ListarEndereco(id): Observable<any> {
 
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.put('https://horadolixo.ml/_ws/showAddress.php?auth=AKur0On8iWjP2OmasopsZA&user_id=' + id,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    ExcluirEndereco(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/deleteAddress.php?auth=AKur0On8iWjP2OmasopsZA&addr_id=' + id,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    ListarNotificacao(id): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/showPush.php?auth=AKur0On8iWjP2OmasopsZA&user_id=' + id,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    ExcluirNotificacao(id): Observable<any> {
  
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/deletePush.php?auth=AKur0On8iWjP2OmasopsZA&push_id=' + id,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    ListarHistorico(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/showHistory.php?auth=AKur0On8iWjP2OmasopsZA&user_id=' + id,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    ExcluirHistorico(id): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/deleteHistory.php?auth=AKur0On8iWjP2OmasopsZA&history_id=' +id,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    ListarConfiguracoes(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.httpClient.get('https://horadolixo.ml/_ws/showTokens.php?auth=AKur0On8iWjP2OmasopsZA&user_id=' + id,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    AlterarConfiguracoes(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.httpClient.post('https://horadolixo.ml/_ws/editTokens.php?auth=AKur0On8iWjP2OmasopsZA',model,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }

    CadastrarToken(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };
        return this.httpClient.post('https://horadolixo.ml/_ws/createTokens.php?auth=AKur0On8iWjP2OmasopsZA',model,{ responseType: 'text'}).pipe(catchError(this.handleError.bind(this)));
    }



    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.log('Client Side Error :', errorResponse.error.message);
        } else {
            console.log('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
    }

}