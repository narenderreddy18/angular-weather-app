import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnChanges{
  @Input() city: string = '';
  weatherData: any;
  hourlyForecast: any;
  fiveDayForecast: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.refreshWeather();
    this.refreshHourlyForecast();
    this.refreshFiveDayForecast();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['city'] && changes['city'].currentValue) {
      this.refreshWeather();
    this.refreshHourlyForecast();
    this.refreshFiveDayForecast();
    }
  }

  refreshWeather() {
    this.weatherService.getGeoCoordinates(this.city).subscribe((data: any) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      this.weatherService.getCurrentForecast(latitude, longitude).subscribe((data: any) => {
      this.weatherData = (data.current);
      });
    });
  }

  refreshHourlyForecast() {
    this.weatherService.getGeoCoordinates(this.city).subscribe((data: any) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      this.weatherService.getHourlyForecast(latitude, longitude).subscribe((data: any) => {
        const currentTime = new Date().getTime() / 1000; // Current time in seconds
        const nextHours = currentTime + (24 * 3600); // 12 hours later in seconds
        this.hourlyForecast = data.hourly.filter((forecast: any) => {
          return forecast.dt <= nextHours;
        });
      });
    });
  }  

  refreshFiveDayForecast() {
    this.weatherService.getGeoCoordinates(this.city).subscribe((data: any) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      this.weatherService.getFiveDayForecast(latitude, longitude).subscribe((data: any) => {
        this.fiveDayForecast=data.daily;
      });
    });
  }

  getWeatherIcon(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }

  convertTemperatureToCelsius(temp: number): any {
    if (temp) {
      temp = Math.round(temp- 273.15);
    }
    return temp;
  }

  getTimeFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const hoursStr = hours.toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hoursStr}:${minutes} ${ampm}`;
  }

  getDateFromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }
}