import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geoapiUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  private weatherapiUrl = 'https://api.openweathermap.org/data/3.0/onecall';
  private apiKey = '59f1ba8e9fc3f4969af4b289dd779d6e';  

  constructor(private http: HttpClient) { }

  getGeoCoordinates(city: string): Observable<any> {
    const params = new HttpParams()
      .set('q', city)
      .set('limit',1)
      .set('appid', this.apiKey);
    return this.http.get(this.geoapiUrl, { params });
  }

  getCurrentForecast(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('exclude', 'hourly,minutely,daily,alerts')
      .set('appid', this.apiKey);

    return this.http.get(this.weatherapiUrl, { params });
  }

  getHourlyForecast(lat: number, lon: number): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('exclude', 'current,minutely,daily,alerts')
      .set('appid', this.apiKey);

    return this.http.get<any>(this.weatherapiUrl, { params });
  }

  getFiveDayForecast(latitude: number, longitude: number): Observable<any[]>{
    const params = new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('exclude', 'current,minutely,hourly,alerts')
      .set('appid', this.apiKey);

      return this.http.get<any>(this.weatherapiUrl, { params });
  }
}