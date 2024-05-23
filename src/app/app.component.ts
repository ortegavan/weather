import { Component, effect, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
        MatIconModule,
        MatSlideToggleModule,
    ],
})
export class AppComponent {
    readonly toggleState = signal(localStorage.getItem('darkTheme') === 'true');

    constructor() {
        effect(() => {
            const darkTheme = this.toggleState();
            localStorage.setItem('darkTheme', darkTheme.toString());
            if (darkTheme) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        });
    }
}
