// LoginPage

import React from "react";
import { GoogleLogin} from 'react-google-login'
import { useRouter } from "next/router";

const clientId = "YOUR_CLIENT_ID.apps.googleusercontent.com"

const LoginPage = () => {
    const router = useRouter();

    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
        router.push('/game');
    };

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res);
        // ログイン失敗時の処理
    };

    return (
        <div>
        <h1>Login Page</h1>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
};

export default LoginPage;