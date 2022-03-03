import React from "react";
import LoginForm from "../components/LoginForm";
import ProtectRoute from "../components/ProtectRoute";
import section_styles from "../scss/sections.module.scss";
import styles from "../scss/sign-up.module.scss";

const SingIn: React.FC = (): React.ReactElement => {
    return (
        <section className={`${section_styles.one_page} ${styles.register}`}>
            <h2>Login</h2>
            <LoginForm />
            <ProtectRoute />
        </section>
    );
};

export default SingIn;
