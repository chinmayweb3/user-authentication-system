// run script at html load
// const prismadb = require("../utils/prisma.ts");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// npx browserify public/main.js -o public/bundle.js -t [ babelify --presets [ @babel/preset-env ] ]

const token = localStorage.getItem("token");
console.log("calling dahsboard");
var user;
if (!token) window.location.href = "/auth/login";
(async () => {
  const res = await fetch(`${baseUrl}/a/userfind`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (res.status != 200) {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
    return;
  }
  user = await res.json();

  document.getElementById("givenUsername").innerText = user.username;
})();
// run script at html load

function sendFormData(e) {
  e.preventDefault();
  console.log("calling the function");
}
// async function sendFormData(e) {
//   e.preventDefault();
//   const prisma = new PrismaClient();
//   console.log("playing");
//   // throw error if there is spaces in the front and back of the string
//   let pname = e.target.name.value;
//   let wname = e.target.web.value;
//   try {
//     if (
//       pname.startsWith(" ") ||
//       pname.endsWith(" ") ||
//       wname.startsWith(" ") ||
//       wname.endsWith(" ")
//     ) {
//       throw { code: 101, msg: "no space allowed" };
//     }

//     // add slug to project name replace space with -
//     pname = pname.replaceAll(" ", "-");

//     // check if the text in website name is uri with new url
//     // uri is incorrect throw an error on the screen

//     //check if the project name has been used by the same username before (with prismadb)
//     console.log("calling prisma ", prisma);
//     // if so throw an error on the screen

//     //generate an random client id and secret id for the developer

//     //store the projectname,websitename,clientid,secretid,userid, into the db

//     //
//     console.log("logingd ", $("#add-project").attr("data-allowed", "1"));
//   } catch (er) {
//     console.log("dashboard/sendformdta ->", er);

//     document.getElementById("error").innerText = er.msg || "issue is there";
//     document.getElementById("error").style.display = "block";
//   }
// }

const sendhello = async () => {
  const u = await prisma.user.findFirst({ where: { username: "m998" } });
  console.log("callign the function", prisma, u);
};
window.sendhello = sendhello;
