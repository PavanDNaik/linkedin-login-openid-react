export type LinkedinButtonProps = {
  imgUrl?: string;
  client_id: string;
  redirect_url: string;
  permissions?: Permission[];
};

export type Permission = "openid" | "profile" | "email";

export type AuthResponse =
  | {
      success: boolean;
      error_status: string | null;
      error_description: string | null;
      state: string | null;
      code?: undefined;
    }
  | {
      success: boolean;
      code: string | null;
      state: string | null;
      error_status?: undefined;
      error_description?: undefined;
    };