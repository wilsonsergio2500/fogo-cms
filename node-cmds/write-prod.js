const fs = require('fs');

fs.writeFile(`./src/environments/test.txt`, , function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
