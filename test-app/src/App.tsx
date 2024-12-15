import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { LinkedinPage } from "../../lib"; // This is local package!, Instead use import {LinkedinPage} from "react-linkedin-login-openid"
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/myLoginpage" element={<Login />}></Route>
          <Route
            path="/linked_in_auth_resp"
            element={<LinkedinPage successPath="/home" />}
          ></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
