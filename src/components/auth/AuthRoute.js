import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRoute = ({ path, component: TargetComponent }) => {
    // useAuth returns { isAuthenticated, logout, login, register, getCurrentUser }
    // isAuthenticated should be a boolean
    // potential error - is this variable initialized properly to obtain isAuthenticated?
    const { isAuthenticated } = useAuth()

    return (
        <Route exact path={path} render={props => {
            // if user is authenticated route to TargetComponent with props?
            if (isAuthenticated()) {
                return <TargetComponent {...props} />
            } else {
                // else route to login page
                return <Redirect to="/login" />
            }
        }} />
    )
}

export default AuthRoute
