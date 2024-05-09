import { Component, Output,EventEmitter } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cities: string[] = ['RIO DE JANEIRO', 'BEIJING', 'LOS ANGELES'];
  searchCity: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchCity);
  }
}