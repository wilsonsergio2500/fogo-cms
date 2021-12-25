const fs = require('fs');
const path = require("path");

const params = {
  filename: '-filename=',
  content: '-content='
}

const args = process.argv.reduce((prev, curr) => {
  for (const key in params) {
    if (curr.indexOf(params[key]) != -1) {
      const val = curr.replace(params[key], "");
      const el = {}; el[key] = val;
      return { ...prev, ...el }
    }
  }
  return {};
}, {})


const targetFolder = path.resolve(__dirname, '..', 'src', 'environments');
const fullPath = `${targetFolder}\\${args.filename}`;

const displayFileContent = (path) => {
  const buff = fs.readFileSync(path);
  console.log(buff.toString());
}
fs.writeFileSync(fullPath, args.content);
displayFileContent(fullPath);
//fs.writeFile(fullPath, args.content, function (err) {
//  if (err) {
//    return console.log(err);
//  }
//  console.log("The file was saved!");
//  displayFileContent(fullPath);
//});
