/// <reference types="jest" />
import 'jest-preset-angular/setup-jest';

Object.defineProperty(globalThis.navigator, 'geolocation', {
    writable: true,
    value: {
        getCurrentPosition: jest.fn(),
    },
});
