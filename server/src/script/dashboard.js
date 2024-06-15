// run script at html load
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
  showProject();
})();
// run script at html load

async function showProject() {
  console.log("show project triggered");
  // document.getElementById("show-project").style.display = "block";
  try {
    const res = await fetch(`${baseUrl}/a/showprojects`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status != 200) {
      throw "";
    }
    const json = await res.json();

    console.log("json ::>", json);

    const html = json.data.project
      .map((i, index) => {
        return `<div style="display:flex, flex-direction:column" key=${i.id}>
            <h4 style="margin:0" >${index + 1}. ${i.projectName}</h4>
            <p style="margin:0"> website Name : ${i.websiteName}</p>
            <p style="margin:0" >client Id : ${i.clientId}</p>
            <p style="margin:0" >secret Id : ${i.secretId}</p>
            <p></p>
          </div>`;
      })
      .join(" ");
    document.getElementById("show-project").innerHTML =
      "<h2>project</h2>" + html;
  } catch (er) {
    console.log("cathc", er);
    document.getElementById("show-project").innerText = "no Project FOund";
  }
}

async function sendFormData(e) {
  e.preventDefault();
  console.log("playing");
  // throw error if there is spaces in the front and back of the string
  let pname = e.target.name.value;
  let wname = e.target.web.value;
  try {
    const uProRes = await fetch(`${baseUrl}/a/projectadd`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ wname, pname }),
    });
    const uProJson = await uProRes.json();
    if (uProRes.status !== 201)
      throw { code: uProRes.status, msg: uProJson.msg };

    console.log("project created on frontend ", uProJson);
    showProject();
    console.log("logingd ", $("#add-project").attr("data-allowed", "1"));
  } catch (er) {
    console.log("dashboard/sendformdta ->", er);

    document.getElementById("error").innerText = er.msg || "issue is there";
    document.getElementById("error").style.display = "block";
  }
}
window.dashboardSendFromData = sendFormData;

async function addProject() {
  console.log("add project clicked");
  $("#div-add").css("display", "block");
  const dataAllowed = $("#add-project").attr("data-allowed");
  if (!+dataAllowed) return;
  $("#add-project").attr("data-allowed", "0");
  const c = ` 
            <form onsubmit='dashboardSendFromData(event)' >
              <div>
                <label for='name'>Project Name:</label>
                <input type='text' id='name' name='name' placeHolder='google' required  />
              </div>
              <div>
                <label  for='web'>Website Name:</label>
                <input type='url' id='web' name='web' placeHolder='www.google.com' required  />
              </div>
              <p id='error'></p>
              <button  id='submit' type='submit'>Submit</button>
            </form>
    `;
  document.getElementById("div-add").insertAdjacentHTML("beforeend", c);
}

window.dashboardAddProject = addProject;
