import { LINKEDIN_AUTHCODE_URL } from "../constant";
import { Permission } from "../types/propTypes";

export function prepareAuthorizationURL(
  client_id: string,
  redirect_url: string,
  permissions?: Permission[]
) {
  let authReqURL = `${LINKEDIN_AUTHCODE_URL}?response_type=code&client_id=${client_id}&&state=${getState()}&redirect_uri=${getCompleteRedirectUrl(
    redirect_url
  )}&scope=openid`;

  if (permissions != undefined) {
    for (const permission of permissions) {
      authReqURL += `%20${permission}`;
    }
  } else {
    authReqURL += "%20profile%20email"; // default profile and email
  }

  return authReqURL;
}

// use current path to redirect user incase of failure
function getState() {
  return window.location.pathname;
}

export function getCompleteRedirectUrl(path: string): string {
  if (path.startsWith("http")) return path;

  if (path.length > 0 && path.charAt(0) != "/") {
    path = "/" + path;
  }
  return window.location.origin + path;
}
