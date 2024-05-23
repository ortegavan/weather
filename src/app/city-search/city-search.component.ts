import { Component, OnInit, inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs';

@Component({
    selector: 'app-city-search',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ],
    templateUrl: './city-search.component.html',
    styleUrl: './city-search.component.css',
})
export class CitySearchComponent implements OnInit {
    service = inject(WeatherService);
    search = new FormControl('', [Validators.minLength(2)]);

    ngOnInit(): void {
        this.search.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
            if (!this.search.invalid && value) {
                const input = value.split(',').map((s: string) => s.trim());
                this.service.updateCurrentWeather(
                    input[0],
                    input.length > 1 ? input[1] : undefined,
                );
            }
        });
    }
}
