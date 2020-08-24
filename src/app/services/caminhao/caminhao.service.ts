import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CaminhaoService {
    constructor(private httpClient: HttpClient) { }

    etapa1Model;

    BuscarCaminhao(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"
            }),
        };
        return this.httpClient.get('http://horadolixo.ml:8082/api/devices',httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    BuscarDispositivos(model): Observable<any> {
        if (model == null) {
            model = {}
        }
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                // 'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"

                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('http://horadolixo.ml:8082/api/devices',httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    BuscarCaminhaoCoordenadas(model){
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                // 'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
                //"Authorization": "Basic YWRtaW46YWRtaW4=",
                //"Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"

                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        //return this.httpClient.get('http://horadolixo.ml/painel/ws/positions.php?auth=AKur0On8iWjP2OmasopsZA&deviceid=17&startDate=2020-05-05&startTime=00:00:00&endDate=2020-05-05&endTime=23:59:59',httpOptions).pipe(catchError(this.handleError.bind(this)));
       // console.log('http://horadolixo.ml/painel/ws/positions.php?auth=AKur0On8iWjP2OmasopsZA&deviceid=' + model.deviceId +'&startDate=' + model.dataInicio + '&startTime=00:00:00&endDate=' +  model.dataFim + '&endTime=23:59:59');
       console.log('http://horadolixo.ml/painel/ws/positions.php?auth=AKur0On8iWjP2OmasopsZA&deviceid=' + model.deviceId +'&startDate=' + model.dataInicio + '&startTime=' + model.timeIni + '&endDate=' +  model.dataFim + '&endTime=' + model.timeFim);
        return this.httpClient.get('http://horadolixo.ml/painel/ws/positions.php?auth=AKur0On8iWjP2OmasopsZA&deviceid=' + model.deviceId +'&startDate=' + model.dataInicio + '&startTime=' + model.timeIni + '&endDate=' +  model.dataFim + '&endTime=' + model.timeFim,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

  
    
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
        return this.httpClient.post('http://horadolixo.ml:8082/api/devices',model,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    Deletar(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"


                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.delete('http://horadolixo.ml:8082/api/devices/' + id,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    Editar(model): Observable<any> {
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
        return this.httpClient.put('http://horadolixo.ml:8082/api/devices/' + model.id,model,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    TrackPost(): Observable<any> {
       
        const httpOptions = {
            headers: new HttpHeaders({
                    "content-type": "application/x-www-form-urlencoded"
            }),
            withCredentials: true
        };
        const body = 'email=admin&password=admin';
        return this.httpClient.post('http://horadolixo.ml:8082/api/session',body,httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

    TrackGet(): Observable<any> {
        return this.httpClient.get('http://horadolixo.ml:8082/api/session').pipe(catchError(this.handleError.bind(this)));
    }

    
    Server(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                //'Content-Type': 'application/json',
                // 'Authorization': 'Basic ' + btoa('admin' + ':' + 'admin')
                "Authorization": "Basic YWRtaW46YWRtaW4=",
                "Cookie": "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0"

                //.addHeader("Cookie", "JSESSIONID=node01wqhgixln03l91w82qe2gb3rac108.node0")
            }),
        };
        return this.httpClient.get('http://horadolixo.ml:8082/api/server',httpOptions).pipe(catchError(this.handleError.bind(this)));
    }

        
    Session(): Observable<any> {
       
        // const header = new Headers();
        // header.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = 'email=admin&password=admin';
      
    
        return this.httpClient.post('http://horadolixo.ml:8082/api/session',body,{
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }).pipe(catchError(this.handleError.bind(this)));
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