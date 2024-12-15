import { authResponse, handleCode } from "../utils/scripts/redirectPage";
import "../css/msg.css";
import { useEffect, useState } from "react";
import { AuthResponse } from "../utils/types/propTypes";
function LinkedinPage({
  successPath,
  postUrl,
}: {
  successPath: string;
  postUrl?: string;
}) {
  const [msg, setMessage] = useState<null | string>();

  function handleError(
    response: AuthResponse,
    msg?: string,
    delay: number = 1000
  ) {
    setTimeout(() => {
      setMessage(response.error_description || msg || "Internal Server Error.");
      setTimeout(() => {
        if (response.state) {
          window.location.assign(response.state);
        }
      }, delay);
    }, delay);
  }

  function handleSucces(response: AuthResponse, delay: number = 1000) {
    setTimeout(() => {
      setMessage("Login SuccessFull");
      setTimeout(() => {
        window.location.assign(successPath);
      }, delay);
    }, delay);
  }

  useEffect(() => {
    const response: AuthResponse = authResponse();
    if (!response.success || !response.code) {
      handleError(response);
    } else {
      handleCode(response.code, postUrl)
        .then((data) => {
          console.log(data);
          handleSucces(response);
        })
        .catch((e) => {
          sessionStorage.setItem("code", response.code || "");
          handleError(
            response,
            "Code is stored in session. Could not send it to server. postUrlRequired",
            100
          );
        });
    }
  });

  return (
    <div>
      Please wait You will be redirected soon{" "}
      {msg && (
        <div className="alert">
          <span className="closebtn" onClick={() => setMessage(null)}>
            &times;
          </span>
          {msg}
        </div>
      )}
    </div>
  );
}

export default LinkedinPage;
