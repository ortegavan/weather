# Weather

Aplicação de previsão do tempo feita para exercícios do livro "Angular for Enterprise Applications" de Doguhan Uluca.

## Alteração 01: refatoração de assinatura do método

-   Alterada assinatura do método `getCurrentWeather` de `WeatherService` para receber um termo de busca único para cidade ou cep e alterado país para ser opcional;
-   Adicionado método `getWeatherByCoords` para buscar previsão do tempo por coordenadas;
-   Criado método `getCurrentWeatherHelper` para centralizar a lógica de busca de previsão do tempo;
-   Implementada primeira versão do componente `city-search` para buscar previsão do tempo por cidade ou cep.

## Alteração 02: implementação da busca por cidade

-   Criado componente `city-search` para buscar previsão do tempo por cidade ou cep;
-   Utilizado `debounceTime` para evitar chamadas desnecessárias à API de previsão do tempo;
-   Adicionadas validações ao formulário de busca.

## Alteração 03: implementação da comunicação entre componentes

-   Criado `subject` readonly + método para atualizar o subject no serviço `WeatherService`;
-   CurrentWeatherComponent agora se inscreve no subject do serviço `WeatherService` para exibir a previsão do tempo;
-   CitySearchComponent agora atualiza o subject do serviço `WeatherService` com a cidade ou cep digitado.

## Alteração 04: refatoração das inscrições a observables

-   Refatoradas inscrições a observables para proceder com a desinscrição usando `takeUntil` + `Subject` no `ngOnDestroy` ou pipe async nos componentes e o operador `first()` nas services para evitar memory leaks.

## Alteração 05: implementação da busca por CEP + geolocalização

-   Criada uma conta em [https://www.geonames.org](https://www.geonames.org) e armazenado o username em um arquivo de ambiente;
-   Criada service `PostalCodeService` para buscar informações de localização a partir de um CEP;
-   Alterada `WeatherService` para consultar as duas APIs (verifica se é um CEP válido e depois procede com a busca por previsão) usando `switchMap`.

## Alteração 06: implementação do dark mode

-   Criado um `signal` no AppComponent para controlar o modo claro/escuro;
-   No `effect` é atualizado o local storage com a opção escolhida e setado o `data-theme` no `document.documentElement`;
-   No CSS tem-se variáveis para as cores do modo claro e escuro.

## Alteração 07: implementação da previsão inicial

-   Se o usuário permitir, a aplicação irá buscar a previsão do tempo com base na geolocalização dele usando `navigator.geolocation.getCurrentPosition`.

## Alteração 08: implementação de testes unitários

-   Removidos Jasmine e Karma e adicionado Jest seguindo [este link](https://medium.com/edataconsulting/how-to-switch-from-karma-to-jest-using-angular-7335588ffdf0);
-   Escritos testes unitários para WeatherService e PostalCodeService.
