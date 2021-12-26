# Fogo Cms

![example workflow](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-merge.yml/badge.svg)
![Firebase PR workflow](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.x

## The Idea
A simple to use Headless Content Management System (CMS) developed using dream team angular paradigms - Firebase, @ngxs, @angular/fire, @ngx-formly, @angular/flex-layout

## Prelude to Getting Started
Fogo is fire in portuguese. The name is not an incidental :blush:, Firebase is central ingridient of this project and as such the project utilizes items such as Firebase authorization via custom claims and Firebase functions. Given this requirement, you must utilize a Firebase account that would enable for this core services i.e Blaze Account.

To get started you will have to go thru the normal flow or setup that is part of the Firebase ecosystem.

- Create a new Firebase Application
- Enable Firebase Authentication
- Enable Email/Password Provider
- Enable Firestore Database
- Enable Firebase Function
- Enable Firebase Storage
- Register a new Application on Firebase => Web

After registering a new web application update your angular enviroment(s) file with your firebase values

```javascript
export const environment = {
    production: false,
    firebase: {
      apiKey: "xxxxx",
      authDomain: "xxxxx",
      projectId: "xxxxxx",
      storageBucket: "xxxxxx",
      messagingSenderId: "xxxxx",
      appId: "xxxxxx"
    }
};
```
