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
})();
// run script at html load

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

    //
    console.log("logingd ", $("#add-project").attr("data-allowed", "1"));
  } catch (er) {
    console.log("dashboard/sendformdta ->", er);

    document.getElementById("error").innerText = er.msg || "issue is there";
    document.getElementById("error").style.display = "block";
  }
}
window.dashboardSendFromData = sendFormData;
