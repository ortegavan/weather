import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { WeatherService } from '../../services/weather/weather.service';
import { Subject, debounceTime, filter, takeUntil, tap } from 'rxjs';

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
export class CitySearchComponent implements OnInit, OnDestroy {
    stop$ = new Subject<void>();
    service = inject(WeatherService);
    search = new FormControl('', [Validators.minLength(2)]);

    ngOnInit(): void {
        this.search.valueChanges
            .pipe(
                takeUntil(this.stop$),
                filter(() => this.search.valid),
                debounceTime(1000),
                tap(() => this.doSearch(this.search.value)),
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this.stop$.next();
        this.stop$.complete();
    }

    doSearch(value: string | null) {
        if (value) {
            const userInput = value.split(',').map((s: string) => s.trim());
            const searchText = userInput[0];
            const country = userInput.length > 1 ? userInput[1] : undefined;
            this.service.updateCurrentWeather(searchText, country);
        }
    }
}
