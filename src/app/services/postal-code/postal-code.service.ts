import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostalCode } from '../../models/postal-code';
import { PostalCodeData } from '../../models/postal-code-data';

@Injectable({
    providedIn: 'root',
})
export class PostalCodeService {
    constructor(private httpClient: HttpClient) {}

    resolvePostalCode(postalCode: string): Observable<PostalCode> {
        const uriParams = new HttpParams()
            .set('maxRows', '1')
            .set('username', environment.username)
            .set('postalcode', postalCode);

        return this.httpClient
            .get<PostalCodeData>(
                `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON`,
                { params: uriParams },
            )
            .pipe(map((data) => data.postalCodes[0]));
    }
}
