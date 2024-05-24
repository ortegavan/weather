import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CurrentWeather } from '../../models/current-weather';
import { PostalCodeService } from '../postal-code/postal-code.service';
import { CurrentWeatherData } from '../../models/current-weather-data';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    readonly currentWeather$ = new BehaviorSubject<CurrentWeather>({
        city: '',
        country: '',
        date: Date.now(),
        image: '',
        temperature: 0,
        description: '',
    });

    constructor(
        private httpClient: HttpClient,
        private postalCodeService: PostalCodeService,
    ) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.getCurrentWeatherByCoords(position.coords).subscribe((data) =>
                this.currentWeather$.next(data),
            );
        });
    }

    getCurrentWeather(
        search: string,
        country?: string,
    ): Observable<CurrentWeather> {
        return this.postalCodeService.resolvePostalCode(search).pipe(
            switchMap((postalCode) => {
                if (postalCode && postalCode.lat && postalCode.lng) {
                    return this.getCurrentWeatherByCoords({
                        latitude: postalCode.lat,
                        longitude: postalCode.lng,
                    } as GeolocationCoordinates);
                } else {
                    const uriParams = new HttpParams()
                        .set('q', country ? `${search},${country}` : search)
                        .set('appid', environment.appId);
                    return this.getCurrentWeatherHelper(uriParams);
                }
            }),
        );
    }

    getCurrentWeatherByCoords(
        coords: GeolocationCoordinates,
    ): Observable<CurrentWeather> {
        const uriParams = new HttpParams()
            .set('lat', coords.latitude.toString())
            .set('lon', coords.longitude.toString())
            .set('appid', environment.appId);

        return this.getCurrentWeatherHelper(uriParams);
    }

    updateCurrentWeather(search: string, country?: string): void {
        this.getCurrentWeather(search, country)
            .pipe(first())
            .subscribe((data) => this.currentWeather$.next(data));
    }

    private getCurrentWeatherHelper(
        uriParams: HttpParams,
    ): Observable<CurrentWeather> {
        return this.httpClient
            .get<CurrentWeatherData>(
                `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
                { params: uriParams },
            )
            .pipe(map((data) => this.transformToCurrentWeather(data)));
    }

    private transformToCurrentWeather(
        data: CurrentWeatherData,
    ): CurrentWeather {
        return {
            city: data.name,
            country: data.sys.country,
            date: data.dt * 1000,
            image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            temperature: data.main.temp - 273.15,
            description: data.weather[0].description,
        };
    }
}
