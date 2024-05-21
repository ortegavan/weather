import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CitySearchComponent } from './city-search/city-search.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
        CurrentWeatherComponent,
        MatToolbarModule,
        MatCardModule,
        CitySearchComponent,
    ],
})
export class AppComponent {}
