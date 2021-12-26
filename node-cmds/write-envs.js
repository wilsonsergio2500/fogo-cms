const fs = require('fs');
const path = require("path");

const prodEnv = `${process.env.FIREBASE_ENV_PROD}`;
const devEnv = `${process.env.FIREBASE_ENV_TEST}`;
const targetFolder = path.resolve(__dirname, '..', 'src', 'environments');


fs.writeFileSync(`${targetFolder}/environment.prod.ts`, prodEnv);
fs.writeFileSync(`${targetFolder}/environment.ts`, devEnv);
