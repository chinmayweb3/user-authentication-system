import "./App.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <button
        onClick={async (e) => {
          console.log("clicked");
          let origin = window.location.origin;
          console.log("location ", origin);
          origin = origin
            .replaceAll("/", "%2F")
            .replaceAll(":", "%3A")
            .replaceAll("=", "%26");

          console.log("location ", origin);
          // ? & = : / @
          // window.location.href =
          //   "http://localhost:4000/o/auth/login?clientid=8db029cd965a6dd2868e20305206fce9&redirect=" +
          //   origin;
          // const newWindow = window.open("http://localhost:4000/o/auth/login");
          // window.addEventListener(
          //   "message",
          //   (event) => {
          //     console.log("data::: ", event);
          //     if (event.origin === "http://localhost:4000") {
          //       console.log("data ", event.data);
          //       newWindow.close();
          //     }
          //   },
          //   { once: true }
          // );

          // d.onlo
          // const res = await axios.get("http://localhost:4000");

          // console.log("response", res);
        }}
      >
        Fetching
      </button>
    </div>
  );
}

export default App;
