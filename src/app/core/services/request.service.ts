import {Injectable} from '@angular/core';
import {AlertService} from './alert.service';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Request} from 'src/app/shared/models/request';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private serverUrl =  `${environment.apiUrl}/requests`;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** GET ALL requests */
  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.serverUrl).pipe(
      catchError(this.handleError<Request[]>('getRequests'))
    );
  }

  /** GET request by id */
  getRequest(id: number): Observable<Request> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Request>(url).pipe(
      catchError(this.handleError<Request>(`getRequest id=${id}`))
    );
  }

  /** DELETE request */
  deleteRequest(request: Request | number): Observable<Request> {
    const id = typeof request === 'number' ? request : request.id;
    const url = `${this.serverUrl}?${id}`;
    return this.http.delete<Request>(url).pipe(
      catchError(this.handleError<Request>('deleteRequest'))
    );
  }
}
