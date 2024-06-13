const { exec } = require("child_process");

const args = process.argv.slice(2);

const findArgIndex = (arg) => args.findIndex((a) => a === arg);

console.log("args", args, args[1]);

if (args.length !== 3 || findArgIndex("-o") == -1 || args[1] !== "-o") {
  console.error("arguments are wrong or missing");
  process.exit(1);
}

exec(
  `npx browserify src/views/${args[0]} -o src/views/${args[2]} -t [ babelify --presets [ @babel/preset-env ] ]`,
  (error, stdout, stderr) => {
    console.log("all the end ", error, stdout, stderr);
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`successful. Output file: ${args[2]}`);
  }
);
