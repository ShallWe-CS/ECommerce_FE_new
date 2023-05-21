import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Loader from "../Loader/Loader";
import OktaSignInWidget from "./OktaSignInWidget";

const LoginWidget = ({ config }) => {
    const { oktaAuth, authState} = useOktaAuth();
    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (error) => {
        console.log('Sign in error:  ',error);
    }

    if (!authState) {
        return (
            <Loader />
        );
    }

    return authState.isAuthenticated ?
    <Navigate to={{ pathname: '/'}}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default LoginWidget;