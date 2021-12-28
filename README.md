<h1>
🔥 Fogo Cms
</h1>

![Firebase Hosting](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-merge.yml/badge.svg)
![Firebase PR workflow](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)
![GitHub](https://img.shields.io/github/license/wilsonsergio2500/fogo-cms?style=flat-square)
[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://fogo-cms.web.app/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.x

## The Idea
A simple to use Headless Content Management System (CMS) developed using dream team angular paradigms - Firebase, @ngxs, @angular/fire, @ngx-formly, @angular/flex-layout

## The Demo
👾 More Than Just Comic => https://fogo-cms.web.app/

User: editor@mtc.com
Pass: editor123


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

Roles and Authorization
| Admin Views                         | blogger  | editor | admin | superuser
| ------------------------------------|:--------:|:------:|:-----:| :--------:|
| Posts and Blog Posts                | ✓ | |✓ |✓ |
| Image Gallery                       |✓  | ✓| ✓ |✓ |
| Pages                               |   | ✓| ✓ |✓ |
| Navigation Creation                 |   | ✓| ✓ |✓ |
| Manage Roles                        |   |   |   |✓ |

### Create your superuser acount

You could add a few users to get started, enter the user information into the file **./admin-tasks/src/user.ts** There is a script in **admin-tasks** that facilitates the creation of the first users.

**Note**: You must at least create a superuser role in order to get started

Since this is a tiny fireabase application we will need a service account file under **./admin-tasks/service-account** rename the file sa.json

In order to obtain the service account go into Project Overview => Project Settings => Service Accounts => Do Generate New Private Key (These are Firebase steps, hence should be familiar to Firebase Users 😎)

```cmd
npm run install:admin-tasks
```
```cmd
npm run do:admin-tasks
```

Alternatively you could cd into the folder and run the commands 😂

Intialize firebase via firebase cli, subsequently deploy Firebase rules and Firebase Functions

```cmd
npm install -g firebase-tools
....
firebase deploy --only functions
firebase deploy --only firestore:rules
```

## Getting Started

Finallly here we are 

```cmd
ng serve
```
Application Paths

| Views             | Route  |
| ------------------------|--------|
| Main Site               | http://localhost:4200/ | 
| Page(s)                 | http://localhost:4200/[page-url]  | 
| Blogs                   | http://localhost:4200/blogs  | 
| Blog Site               | http://localhost:4200/blog/[blog-url]  | 
| Admin                   | http://localhost:4200/admin  |  

