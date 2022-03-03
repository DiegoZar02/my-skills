import React, { Fragment, useContext } from "react";
import { AuthContext } from "../helper/AuthProvider";
import { Navigate } from "react-router-dom";

interface Props {
    type?: "registered" | "unregistered";
}

const ProtectRoute: React.FC<Props> = ({
    type = "unregistered",
}): React.ReactElement => {
    const { AuthStatus } = useContext(AuthContext);
    return (
        <Fragment>
            {type === "unregistered" && (
                <Fragment>
                    {AuthStatus.Logged && <Navigate replace to="/" />}
                </Fragment>
            )}
            {type === "registered" && (
                <Fragment>
                    {!AuthStatus.Logged && <Navigate replace to="/" />}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProtectRoute;
