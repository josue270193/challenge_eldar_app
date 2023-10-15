import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { Party } from "../domain/party.domain";


@Injectable({
    providedIn: 'root'
})
export class PartyService {

    url: string;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {
        this.url = 'http://localhost:8080';
    }

    getAllParty(): Observable<Party> {
        var url = `${this.url}/party/getAll`;
        var params = new HttpParams();

        return this.http
            .get<Party>(url, { params })
            .pipe(retry(1), catchError(this.handleError));
    }

    createParty(data: Party): Observable<Party> {
        const url = `${this.url}/party/create`;
        return this.http
            .post<Party>(url, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }

}

