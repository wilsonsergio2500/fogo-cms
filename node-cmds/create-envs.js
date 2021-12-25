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

fs.writeFile(`${targetFolder}\\${args.filename}`, args.content, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
