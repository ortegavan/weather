/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { environment } from '../../../environments/environment';
import { fakeWeather } from '../../mocks/fake-weather';
import { PostalCodeService } from '../postal-code/postal-code.service';
import { of } from 'rxjs';
import { fakePostalCode } from '../../mocks/fake-postal-code';

describe('WeatherService', () => {
    let weatherService: WeatherService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService, PostalCodeService],
        });

        weatherService = TestBed.inject(WeatherService);
        httpMock = TestBed.inject(HttpTestingController);

        // Mock do navigator.geolocation.getCurrentPosition
        const geo = navigator.geolocation.getCurrentPosition as jest.Mock;
        geo.mockImplementation((success) => {
            success({
                coords: {
                    latitude: -23.4262064362018,
                    longitude: -45.0363296053412,
                },
            });
        });
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(weatherService).toBeTruthy();
    });

    it('should get weather by zip', () => {
        const city = 'Ubatuba';
        const zip = '11680-000';

        weatherService.getCurrentWeather(zip).subscribe((weather) => {
            expect(weather.city).toEqual(city);
        });

        requestByCurrentPosition(httpMock);

        const postalReq = httpMock.expectOne(
            `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON?maxRows=1&username=${environment.username}&postalcode=${zip}`,
        );
        expect(postalReq.request.method).toBe('GET');
        postalReq.flush({ postalCodes: [fakePostalCode] });

        const weatherReq = httpMock.expectOne(
            `http://api.openweathermap.org/data/2.5/weather?lat=${fakePostalCode.lat}&lon=${fakePostalCode.lng}&appid=${environment.appId}`,
        );
        expect(weatherReq.request.method).toBe('GET');
        weatherReq.flush(fakeWeather);
    });

    it('should get weather by city', () => {
        const city = 'Ubatuba';

        weatherService.getCurrentWeather(city).subscribe((weather) => {
            expect(weather.city).toEqual(city);
        });

        requestByCurrentPosition(httpMock);

        const postalReq = httpMock.expectOne(
            `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON?maxRows=1&username=${environment.username}&postalcode=${city}`,
        );
        expect(postalReq.request.method).toBe('GET');
        postalReq.flush({ postalCodes: [] });

        const weatherReq = httpMock.expectOne(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${environment.appId}`,
        );
        expect(weatherReq.request.method).toBe('GET');
        weatherReq.flush(fakeWeather);
    });

    it('should get weather by city and country', () => {
        const city = 'Ubatuba';
        const country = 'BR';

        weatherService.getCurrentWeather(city, country).subscribe((weather) => {
            expect(weather).toEqual(fakeWeather);
        });

        requestByCurrentPosition(httpMock);

        const postalReq = httpMock.expectOne(
            `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON?maxRows=1&username=${environment.username}&postalcode=${city}`,
        );
        expect(postalReq.request.method).toBe('GET');
        postalReq.flush({ postalCodes: [] });

        const weatherReq = httpMock.expectOne(
            `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${environment.appId}`,
        );
        expect(weatherReq.request.method).toBe('GET');
        weatherReq.flush(fakeWeather);
    });

    it('should update current weather', () => {
        jest.spyOn(weatherService, 'getCurrentWeather').mockReturnValue(
            of(fakeWeather),
        );

        const city = 'Ubatuba';

        weatherService.updateCurrentWeather(city);

        weatherService.currentWeather$.subscribe((data) => {
            expect(data).toEqual(fakeWeather);
        });

        requestByCurrentPosition(httpMock);

        expect(weatherService.getCurrentWeather).toHaveBeenCalled();
    });
});

function requestByCurrentPosition(httpMock: HttpTestingController) {
    const request = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5/weather?lat=${fakePostalCode.lat}&lon=${fakePostalCode.lng}&appid=${environment.appId}`,
    );
    expect(request.request.method).toBe('GET');
    request.flush(fakeWeather);
}
