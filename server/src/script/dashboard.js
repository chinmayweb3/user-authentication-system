// run script at html load
import generateClientSecretId from "../utils/createClientSecret.js";

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

async function sendFormData(e) {
  e.preventDefault();
  console.log("playing");
  // throw error if there is spaces in the front and back of the string
  let pname = e.target.name.value;
  let wname = e.target.web.value;
  try {
    if (
      pname.startsWith(" ") ||
      pname.endsWith(" ") ||
      wname.startsWith(" ") ||
      wname.endsWith(" ")
    ) {
      throw { code: 101, msg: "no space allowed" };
    }

    // add slug to project name replace space with -
    pname = pname.replaceAll(" ", "-");

    //check if the project name has been used by the same username before (with prismadb)
    const uProRes = await fetch(`${baseUrl}/a/projectadd`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ wname, pname }),
    });
    const uProJson = await uProRes.json();
    // if so throw an error on the screen
    if (uProJson.length) throw { code: 101, msg: "project name exists" };

    //generate an random client id and secret id for the developer
    const clientId = generateClientSecretId(16);
    const secretId = generateClientSecretId(32);
    console.log("This si clientId ", clientId);
    console.log("This si secretId ", secretId);

    //store the projectname,websitename,clientid,secretid,userid, into the db
    //
    console.log("logingd ", $("#add-project").attr("data-allowed", "1"));
  } catch (er) {
    console.log("dashboard/sendformdta ->", er);

    document.getElementById("error").innerText = er.msg || "issue is there";
    document.getElementById("error").style.display = "block";
  }
}
window.dashboardSendFromData = sendFormData;
