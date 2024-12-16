Here’s the revised README file with the integration details for `linkedin-auth-server-openid` added, while keeping the tables intact:

---

# Linkedin Login OpenID React

**Linkedin Login OpenID React** is a React component that enables authentication with LinkedIn using OpenID Connect. It provides a straightforward way to integrate LinkedIn login functionality into your React applications.

## Prerequisites

1. **Create a LinkedIn App**
   - Navigate to [LinkedIn Developer Portal](https://developer.linkedin.com/).
   - Create a new application if you don't already have one.
   
2. **Request Access for OpenID Connect**
   - Under the "Products" section of your LinkedIn app, request access to "Sign In with LinkedIn using OpenID Connect."

3. **Retrieve Client ID**
   - Once access is approved, navigate to the "Auth" section to obtain your `Client ID`.

4. **Set Up Redirect URL**
   - Define an `Authorized redirect URL` for your application in the LinkedIn Developer Portal. Example: `http://localhost:5173/linked_in_auth_resp`.

## Installation

Install the library using npm:

```bash
npm install react-linkedin-login-openid
```

## Usage

### Step 1: Import the Component

In your login or sign-in page, import the `LinkedinButton` component:

```javascript
import { LinkedinButton } from 'react-linkedin-login-openid';
```

### Step 2: Add the Button Component

Add the `LinkedinButton` component to your page. You must provide the `client_id` and `redirect_url` properties:

```jsx
<LinkedinButton
    client_id={env.VITE_APP_LINKEDIN_CLIENT_ID}
    redirect_url={env.VITE_APP_REDIRECT_URI}
    imgUrl="https://example.com/custom-image.png"
    permissions={["openid", "profile"]}
/>
```

- **`client_id`**: Your LinkedIn app's Client ID (retrieved from the Developer Portal).
- **`redirect_url`**: A user-defined redirect URL to handle the authentication response.
- **`imgUrl`** (optional): URL to a custom image to be displayed on the button.
- **`permissions`** (optional): Array of permissions to request from LinkedIn. Possible values are `"openid"`, `"profile"`, and `"email"`. By default, all three are included.

### Step 3: Create a Route to Capture the Auth Code

In your `App.tsx`, create a route to handle the authentication response from LinkedIn. This route should match the `redirect_url` specified in your LinkedIn app settings.

Import the `LinkedinPage` component:

```javascript
import { LinkedinPage } from 'react-linkedin-login-openid';
```

Define a route to capture the authentication response:

```jsx
<Route
    path="/linked_in_auth_resp"
    element={<LinkedinPage successPath="/home" />}
/>
```

- **`successPath`**: The path to navigate after a successful login.
- **Optional `postUrl` Property**: If you want to send the authorization code to a server, specify the server's URL using the `postUrl` property. The code will be sent in the request body under the `code` key. If `postUrl` is provided, the response from the server will be saved in `localStorage` with the key `UserData`.

---

### Backend Integration with `linkedin-auth-server-openid`

To complete the LinkedIn login flow, integrate the backend using the `linkedin-auth-server-openid` package.

1. **Install and Configure**: Install `linkedin-auth-server-openid` in your Node.js server:
   ```bash
   npm install linkedin-auth-server-openid
   ```
   Import and initialize the `Linkedin` class with your `client_id`, `client_secret`, and `redirect_uri`.

2. **Handle Authorization Code**: Create an API endpoint (e.g., `/login`) on your server to receive the authorization code from the React app. Use the `getData` method of `linkedin-auth-server-openid` to exchange the code for user data.

3. **Send User Data to React**: After successfully fetching the user data from LinkedIn, send it back to the React app. If you're using the `postUrl` feature in `LinkedinPage`, the server response will be stored in `localStorage` with the key `UserData`.

Refer to the [linkedin-auth-server-openid documentation](https://www.npmjs.com/package/linkedin-auth-server-openid) for detailed implementation.

---

### Example Workflow

1. **User clicks the `LinkedinButton`.**
2. **User logs in via LinkedIn.**
3. **LinkedIn redirects the user to the `redirect_url`, providing an authorization code.**
4. **React App:**
   - The `LinkedinPage` component handles the response and sends the authorization code to your server (if `postUrl` is provided).
   - Optionally, the authorization code can be manually handled by retrieving it from `sessionStorage`.
5. **Server:**
   - The server receives the authorization code and exchanges it for user data using `linkedin-auth-server-openid`.
   - The user data is sent back to the React frontend or saved to your database.

---

## Props Reference

### `LinkedinButton`
| Prop           | Type            | Required | Description                                                                 |
|----------------|-----------------|----------|-----------------------------------------------------------------------------|
| `client_id`    | `string`        | Yes      | The Client ID from LinkedIn Developer App                                  |
| `redirect_url` | `string`        | Yes      | The redirect URL for authentication                                        |
| `imgUrl`       | `string`        | No       | URL to a custom image to display on the button                             |
| `permissions`  | `Array<string>` | No       | Permissions to request (`"openid"`, `"profile"`, `"email"`). Defaults to all three. |

### `LinkedinPage`
| Prop           | Type     | Required | Description                                                                                   |
|----------------|----------|----------|-----------------------------------------------------------------------------------------------|
| `successPath`  | `string` | Yes      | Path to redirect upon successful login                                                       |
| `postUrl`      | `string` | No       | Server URL to which the authorization code will be sent in the request body (key: `code`). If provided, the server response is saved in `localStorage` under the key `UserData`. |

## License

This project is licensed under the ISC License. Feel free to use and modify it as per your needs.

---

Let me know if you'd like further modifications!