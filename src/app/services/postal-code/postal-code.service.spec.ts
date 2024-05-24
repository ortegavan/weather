/// <reference types="jest" />
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { PostalCodeService } from './postal-code.service';
import { environment } from '../../../environments/environment';
import { PostalCodeData } from '../../models/postal-code-data';
import { fakePostalCodeData } from '../../mocks/fake-postal-code-data';
import { fakePostalCode } from '../../mocks/fake-postal-code';

describe('PostalCodeService', () => {
    let service: PostalCodeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostalCodeService],
        });

        service = TestBed.inject(PostalCodeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should resolve postal code', () => {
        const zip = '11680-000';

        service.resolvePostalCode(zip).subscribe((data) => {
            expect(data).toEqual(fakePostalCode);
        });

        const req = httpMock.expectOne(
            `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON?maxRows=1&username=${environment.username}&postalcode=${zip}`,
        );
        expect(req.request.method).toBe('GET');
        req.flush(fakePostalCodeData);
    });

    it('should return null if no postal codes found', () => {
        const zip = '00000';
        const mockEmptyPostalCodeData: PostalCodeData = { postalCodes: [] };

        service.resolvePostalCode(zip).subscribe((data) => {
            expect(data).toBeNull();
        });

        const req = httpMock.expectOne(
            `${environment.baseUrl}${environment.geonamesAPI}/postalCodeSearchJSON?maxRows=1&username=${environment.username}&postalcode=${zip}`,
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockEmptyPostalCodeData);
    });
});
