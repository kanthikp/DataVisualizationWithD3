# DataVisualization

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## D3 related instructions

npm install d3 --save
npm install @types/d3 --save

Add d3 types in tsconfig.json
"compilerOptions": {
    ....
    "types": [
      "d3"
    ]

## Features Implemented
1. Created Angular application using CLI
2. Implemented multiple components, routing, services
3. Established communication between components using @input, event emitters
4. Implemented the line chart using D3.js v4
5. Could not completely implement the date range selector using the D4.js.
6. mock data is under

## Deployment Instructions
1. Browse to the root folder '\data-visualization'
2. npm install
3. ng serve 