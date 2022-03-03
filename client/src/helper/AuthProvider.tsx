import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { header } from "./header";

const getToken = () => {
    return localStorage.getItem("accessToken") === null ? false : true;
};

export const AuthContext: any = createContext("");

export const AuthProvider: React.FC = (props): React.ReactElement => {
    const [AuthStatus, setAuthStatus] = useState({
        Logged: false,
        userInfo: null,
    });
    const [Loading, setLoading] = useState(true);
    useEffect(() => {
        const X = async () => {
            if (!getToken()) {
                setLoading(false);
                return;
            }
            try {
                const api: string = "http://192.168.1.64:3001/auth/verify";
                const { data } = await axios.get(api, header);

                setAuthStatus(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        X();
    }, []);

    return (
        <AuthContext.Provider value={{ AuthStatus, setAuthStatus }}>
            {!Loading ? props.children : <p>loading</p>}
        </AuthContext.Provider>
    );
};
