import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, flatMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IPostalCode {
    countryCode: string;
    postalCode: string;
    placeName: string;
    lng: number;
    lat: number;
}

export interface IPostalCodeData {
    postalCodes: IPostalCode[];
}

export interface IPostalCodeService {
    resolvePostalCode(postalCode: string): Observable<IPostalCode | null>;
}

@Injectable({
    providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
    constructor(private httpClient: HttpClient) {}

    resolvePostalCode(postalCode: string): Observable<IPostalCode | null> {
        const uriParams = new HttpParams()
            .set('maxRows', '1')
            .set('username', environment.username)
            .set('postalcode', postalCode);

        return this.httpClient
            .get<IPostalCodeData>(
                `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON`,
                { params: uriParams },
            )
            .pipe(
                flatMap((data) => data.postalCodes),
                defaultIfEmpty(null),
            );
    }
}
