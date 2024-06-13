const { exec } = require("child_process");

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("arguments are wrong or missing");
  process.exit(1);
}

exec(
  `npx browserify src/script/${args[0]}.js -o src/script/${args[0]}out.js -t [ babelify --presets [ @babel/preset-env ] ]`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`successful. Output file: src/script/${args[0]}out.js`);
  }
);
