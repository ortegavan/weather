import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.css'],
    standalone: true,
    imports: [DecimalPipe, DatePipe, MatIconModule],
})
export class CurrentWeatherComponent implements OnInit {
    constructor(private weatherService: WeatherService) {}
    current!: ICurrentWeather;

    ngOnInit(): void {
        this.weatherService
            .getCurrentWeather('Bethesda', 'US')
            .subscribe((data) => (this.current = data));
    }

    getOrdinal(date: number) {
        const n = new Date(date).getDate();
        return n > 0
            ? ['th', 'st', 'nd', 'rd'][
                  (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
              ]
            : '';
    }
}
