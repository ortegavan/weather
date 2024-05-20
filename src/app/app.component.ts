import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [CurrentWeatherComponent, MatToolbarModule, MatCardModule],
})
export class AppComponent {}
