export type CurrentWeatherData = {
    weather: [
        {
            description: string;
            icon: string;
        },
    ];
    main: {
        temp: number;
    };
    sys: {
        country: string;
    };
    dt: number;
    name: string;
};
