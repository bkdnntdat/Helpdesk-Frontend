import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/day-off';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TypeDay } from 'src/app/shared/models/type-day';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayOffService {

  private serverUrl = environment.apiUrl + '/day_offs';   // url server

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

  getDayOffs(id: number): Observable<DayOff[]> {
    return this.http.get<DayOff[]>(`${this.serverUrl}/user_of_year/${id}?year`).pipe(
      catchError(this.handleError<DayOff[]>('getDays'))
    );
  }

  /** POST: add a new request day off */
  addDayOff(dayOff: TypeDay) {
    return this.http.post(this.serverUrl, dayOff);
  }

  getDayOffsByYear(year: number) {
    return this.http.get<DayOff[]>(`${this.serverUrl}/user_of_year/0?year=${year}`);
  }
}
