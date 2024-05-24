import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, mergeMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostalCode } from '../../models/postal-code';
import { PostalCodeData } from '../../models/postal-code-data';

@Injectable({
    providedIn: 'root',
})
export class PostalCodeService {
    constructor(private httpClient: HttpClient) {}

    resolvePostalCode(postalCode: string): Observable<PostalCode | null> {
        const uriParams = new HttpParams()
            .set('maxRows', '1')
            .set('username', environment.username)
            .set('postalcode', postalCode);

        return this.httpClient
            .get<PostalCodeData>(
                `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON`,
                { params: uriParams },
            )
            .pipe(
                mergeMap((data) => data.postalCodes),
                defaultIfEmpty(null),
            );
    }
}
