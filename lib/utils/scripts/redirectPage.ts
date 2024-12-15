import { AuthResponse } from "../types/propTypes";

function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function authResponse(): AuthResponse {
  const queryObject = getQueryParams();
  const state = queryObject.get("state");

  if (queryObject.get("error") || !queryObject.get("code")) {
    const error_status = queryObject.get("error");
    const error_description = queryObject.get("error_description");
    console.error(error_status);
    console.error(error_description);
    return {
      success: false,
      error_status,
      error_description,
      state,
    };
  } else {
    const code = queryObject.get("code");
    return { success: true, code, state };
  }
}

export async function handleCode(code: string, posturl?: string) {
  if (!posturl) {
    sessionStorage.setItem("code", code);
  } else {
    const response = await fetch(posturl, {
      method: "POST",
      body: JSON.stringify({
        code,
      }),
    });
    localStorage.setItem("UserData", JSON.stringify(response));
    return response;
  }
}
