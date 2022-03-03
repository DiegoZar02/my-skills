import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import SingIn from "./SingIn";
import SignUp from "./SignUp";
import App from "../App";
import { AuthProvider } from "../helper/AuthProvider";
import NewSkill from "./NewSkill";
import EditSkill from "./EditSkill";

const Router: React.FC = (): React.ReactElement => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="sign-in" element={<SingIn />} />
                        <Route path="sign-up" element={<SignUp />} />

                        <Route path="skill/">
                            <Route path="new" element={<NewSkill />} />
                            <Route path=":id" element={<EditSkill />} />
                        </Route>

                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Router;
