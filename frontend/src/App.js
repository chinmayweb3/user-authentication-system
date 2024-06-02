import "./App.css";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <button
        onClick={async (e) => {
          console.log("clicked");
          const newWindow = window.open("http://localhost:4000/auth/login");
          window.addEventListener(
            "message",
            (event) => {
              console.log("data::: ", event);
              if (event.origin === "http://localhost:4000") {
                console.log("data ", event.data);
                newWindow.close();
              }
            },
            { once: true }
          );

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
