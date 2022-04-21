import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
function GoogleLoginButton() {
  const responseGoogle = (response) => {
    console.log(response);
  };
  console.log("GoogleLogin");
  return (
    (
      <GoogleLogin
        clientId="798914613502-eeirsjatcut3f8pljkbknd1hdkampga8.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    ),
    document.getElementById("googleButton")
  );
}
export default GoogleLoginButton;
