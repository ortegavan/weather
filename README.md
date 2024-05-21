# Weather

Aplicação de previsão do tempo feita para exercícios do livro "Angular for Enterprise Applications" de Doguhan Uluca.

## Alteração 01: refatoração

-   Alterada assinatura do método `getCurrentWeather` de `WeatherService` para receber um termo de busca único para cidade ou cep e alterado país para ser opcional;
-   Adicionado método `getWeatherByCoords` para buscar previsão do tempo por coordenadas;
-   Criado método `getCurrentWeatherHelper` para centralizar a lógica de busca de previsão do tempo.

Como resultado, a interface `IWeatherService` passou de:

```typescript
export interface IWeatherService {
    getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>;
}
```

para:

```typescript
export interface IWeatherService {
    getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather>;

    getCurrentWeatherByCoords(coords: GeolocationCoordinates): Observable<ICurrentWeather>;
}
```

-   Implementada primeira versão do componente `city-search` para buscar previsão do tempo por cidade ou cep.
