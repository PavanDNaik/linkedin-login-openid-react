import { LinkedinButton } from "../../../lib"; //This is local package!, Instead use import {LinkedinButton} from "react-linkedin-login-openid"
const env = import.meta.env;
function Login() {
  return (
    <div>
      <LinkedinButton
        client_id={env.VITE_APP_LINKEDIN_CLIENT_ID}
        redirect_url={env.VITE_APP_REDIRECT_URI}
      />
    </div>
  );
}

export default Login;
