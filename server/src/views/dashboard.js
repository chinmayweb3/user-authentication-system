// run script at html load

const token = localStorage.getItem("token");
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
  const json = await res.json();

  document.getElementById("givenUsername").innerText = json.username;
})();
// run script at html load
