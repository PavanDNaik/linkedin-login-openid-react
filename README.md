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
/>
```

- **`client_id`**: Your LinkedIn app's Client ID (retrieved from the Developer Portal).
- **`redirect_url`**: A user-defined redirect URL to handle the authentication response.

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

Example:

```jsx
<Route
    path="/linked_in_auth_resp"
    element={<LinkedinPage successPath="/home" postUrl="http://myserver.com/login" />}
/>
```

### Custom Code Handling

If you wish to handle the authorization code manually, you can find it in `sessionStorage` after the login is completed and the user is redirected to the `successPath`.

## Example Workflow

1. **User clicks the `LinkedinButton`.**
2. **User logs in via LinkedIn.**
3. **LinkedIn redirects the user to the `redirect_url`, providing an authorization code.**
4. **The `LinkedinPage` component handles the response, optionally sending the code to your server (if `postUrl` is specified).**
5. **On successful login, the user is redirected to the `successPath`.**
6. **If `postUrl` is provided, the server response is saved in `localStorage` with the key `UserData`.**
7. **If manual handling is desired, the authorization code can be retrieved from `sessionStorage`.**

## Props Reference

### `LinkedinButton`
| Prop           | Type     | Required | Description                               |
|----------------|----------|----------|-------------------------------------------|
| `client_id`    | `string` | Yes      | The Client ID from LinkedIn Developer App |
| `redirect_url` | `string` | Yes      | The redirect URL for authentication       |

### `LinkedinPage`
| Prop           | Type     | Required | Description                                                                                   |
|----------------|----------|----------|-----------------------------------------------------------------------------------------------|
| `successPath`  | `string` | Yes      | Path to redirect upon successful login                                                       |
| `postUrl`      | `string` | No       | Server URL to which the authorization code will be sent in the request body (key: `code`). If provided, the server response is saved in `localStorage` under the key `UserData`. |

## License

This project is licensed under the ISC License. Feel free to use and modify it as per your needs.
