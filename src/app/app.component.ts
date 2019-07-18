import { Component } from '@angular/core';
import { RestService } from './rest.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ])
  ],
})
export class AppComponent {

  weather: any = [];
  cityName: any;
  loading: boolean = false;
  isOpen = true;


  public constructor(public rest: RestService) {
    // this.onSubmitForm();
  }
  onSubmitForm() {
    this.loading = true;
    this.getLatLong(this.cityName ? this.cityName : 'delhi');
  }

  getLatLong(city: any) {
    this.rest.getlatLong(city).subscribe((data: any) => {
      if (data) {
        if (data.list.length) {
          this.getWeather(data.list[0].coord.lat, data.list[0].coord.lon);
        } else {
          this.loading = false;
          alert('Please enter valid city');
        }
      }
    });
  }

  getWeather(lat: any, long: any) {
    this.rest.getWeatherData(lat, long).subscribe((data: any) => {
      this.weather = data.list;
      this.loading = false;
    });
  }

}



