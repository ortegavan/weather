import { CurrentWeatherData } from '../models/current-weather-data';

export const fakeWeatherData: CurrentWeatherData = {
    weather: [
        {
            description: 'sunny',
            icon: '',
        },
    ],
    main: {
        temp: 280.32,
    },
    sys: {
        country: 'TR',
    },
    dt: 1485789600,
    name: 'Bursa',
};
