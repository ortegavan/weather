import { CurrentWeatherData } from '../models/current-weather-data';

export const fakeWeatherData: CurrentWeatherData = {
    weather: [
        {
            description: 'few clouds',
            icon: '02d',
        },
    ],
    main: {
        temp: 302,
    },
    sys: {
        country: 'BR',
    },
    dt: 1716560966000,
    name: 'Ubatuba',
};
