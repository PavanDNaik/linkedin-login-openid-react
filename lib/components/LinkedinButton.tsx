import { DEFAULT_IMAGE_URL, LINKEDIN_AUTHCODE_URL } from "../utils/constant";
import { prepareAuthorizationURL } from "../utils/scripts/authcodeReq";
import { LinkedinButtonProps } from "../utils/types/propTypes";

function LinkedinButton({
  imgUrl,
  client_id,
  redirect_url,
  permissions,
}: LinkedinButtonProps) {
  const url = prepareAuthorizationURL(client_id, redirect_url, permissions);
  return (
    <div>
      <a href={url}>
        <img
          src={imgUrl ? imgUrl : DEFAULT_IMAGE_URL}
          alt="Login_Image"
          srcSet={DEFAULT_IMAGE_URL}
        />
      </a>
    </div>
  );
}

export default LinkedinButton;
