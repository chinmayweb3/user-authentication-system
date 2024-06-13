async function sendFormData(e) {
  e.preventDefault();
  if (+e.target.submit.getAttribute("data-loading")) return;
  e.target.submit.innerHTML = "Loading...";
  e.target.submit.setAttribute("data-loading", "1");

  const email = e.target.email.value,
    username = e.target.username.value,
    name = e.target.name.value,
    password = e.target.password.value;

  const body = { email, password, name, username };

  const resp = await fetch(`${baseUrl}/a/usercreate`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body),
  });

  const json = await resp.json();

  if (resp.status == 201) {
    localStorage.setItem("token", json.token);
    window.location.href = "/auth/profile";
  } else {
    document.getElementById("error").innerText = json?.msg || "username taken";
  }
  e.target.submit.setAttribute("data-loading", "0");
  e.target.submit.innerHTML = "submit";
}
