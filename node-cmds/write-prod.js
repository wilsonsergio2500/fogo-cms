const fs = require('fs');
const path = require("path");

const envContent = `${process.env.FIREBASE_ENV_PROD}`;
const targetFolder = path.resolve(__dirname, '..', 'src', 'environments');

const displayFileContent = (path) => {
  const buff = fs.readFileSync(path);
  console.log(buff.toString());
}

fs.writeFileSync(`${targetFolder}/environment.prod.ts`, envContent);
fs.writeFileSync(`${targetFolder}/environment.ts`, envContent);
displayFileContent(`${targetFolder}/environment.prod.ts`);
