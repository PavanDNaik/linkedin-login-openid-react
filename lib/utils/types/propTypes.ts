export type LinkedinButtonProps = {
  imgUrl?: string;
  client_id: string;
  redirect_url: string;
  permissions?: Permission[];
};

export type Permission = "openid" | "profile" | "email";
