import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { TypeDay } from 'src/app/shared/models/type-day';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayofftypeService {

  private dayOffTypeUrl=environment.apiUrl +"/day_off_types"

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,
    private alertService:AlertService
    ) {}

    private handleError<T> (operation ='operation', result?:T){
      return (error: any): Observable<T> => {
         console.error(error);
         this.alertService.error(`${operation} failed: ${error.alertService}`);
        return of(result as T);
      }
    }

    addDayOffType(name : string): Observable<TypeDay>{
      return this.http.post<TypeDay>(this.dayOffTypeUrl, {name}, this.httpOptions).pipe(
        catchError(this.handleError<TypeDay>('addDayOffType'))
      );
    }

    getDayOffType(): Observable<TypeDay[]>{
      return this.http.get<TypeDay[]>(this.dayOffTypeUrl).pipe(
       catchError(this.handleError<TypeDay[]>('getDayOffType'))
      )
    }

    getTypeDay(id: number): Observable<TypeDay> {
      const url = `${this.dayOffTypeUrl}/${id}`;
      return this.http.get<TypeDay>(url).pipe(
        catchError(this.handleError<TypeDay>(`getTypeDay id=${id}`))
      );
    }

    updateDayOffType(typeday: TypeDay | number): Observable<any>{
      const id = typeof typeday === 'number' ? typeday: typeday.id;
      const url = `${this.dayOffTypeUrl}/${id}`;
      return this.http.put<TypeDay>(url, typeday , this.httpOptions).pipe(
        catchError(this.handleError<any>('updateDayOffType'))
      );
    }
    
}
