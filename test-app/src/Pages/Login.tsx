import { LinkedinButton } from "../../../lib"; //This is local package!, Instead use import {LinkedinButton} from "react-linkedin-login-openid"
const env = import.meta.env;
function Login() {
  return (
    <div>
      <LinkedinButton
        client_id={env.LINKEDIN_CLIENT_ID}
        redirect_url={env.REDIRECT_URI}
      />
    </div>
  );
}

export default Login;
