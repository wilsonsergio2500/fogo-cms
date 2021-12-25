const fs = require('fs');
const path = require("path");

const envContent = `${process.env.FIREBASE_ENV_PROD}`;

const displayFileContent = (path) => {
  const buff = fs.readFileSync(path);
  console.log(buff.toString());
}

fs.writeFileSync("src/environments/environment.prod.ts", envContent);
fs.writeFileSync("src/environments/environment.ts", envContent);
displayFileContent("src/environments/environment.prod.ts");

