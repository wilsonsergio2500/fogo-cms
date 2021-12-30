<h1>
🔥 Fogo Cms
</h1>

[![Firebase Hosting](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-merge.yml)
[![Firebase PR workflow](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-pull-request.yml/badge.svg)](https://github.com/wilsonsergio2500/fogo-cms/actions/workflows/firebase-hosting-pull-request.yml)
[![GitHub](https://img.shields.io/github/license/wilsonsergio2500/fogo-cms?style=flat-square)](https://github.com/wilsonsergio2500/fogo-cms/blob/main/LICENSE)
[![npm](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://fogo-cms.web.app/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.x

## The Idea
A responsive and simple to use Headless Content Management System (CMS) developed using dream team angular paradigms - Firebase, @ngxs, @angular/fire, @ngx-formly, @angular/flex-layout, @angular/material. The goal was to create a project that could be pivot into an MVP or a getting started.

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
| Login                   | http://localhost:4200/login | 
| Page(s)                 | http://localhost:4200/[page-url]  | 
| Blogs                   | http://localhost:4200/blogs  | 
| Blog Site               | http://localhost:4200/blog/[blog-url]  | 
| Admin                   | http://localhost:4200/admin  |  

## Demo UI
### Admin Dashboard
Firebase Auth Guarded list of authorized resources

![Admin Page](resources/screenshots/admin-page.PNG?raw=true "Admin Page")
### Image Gallery
A centralized image management system that integrates with Firebase Storage.

![Image Gallery](resources/screenshots/image-gallery-site.PNG?raw=true "Image Gallery")
### Blog Post
![Blog Post](resources/screenshots/blog-post-site.PNG?raw=true "Blog Post")
### Navigation Builder
A curated site navigaton builder

![Navigation Builder](resources/screenshots/navigation-builder-page.PNG?raw=true "Navigation Builder")

### Mobile Views
<p align="center">
  <img width="300"  src="resources/screenshots/mobile-view-1.png?raw=true">
</p>
<p align="center">
  <img width="300"  src="resources/screenshots/mobile-view-2.png?raw=true">
</p>