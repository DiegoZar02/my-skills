import React from "react";
import ProtectRoute from "../components/ProtectRoute";

import RegisterForm from "../components/RegisterForm";

import section_styles from "../scss/sections.module.scss";
import styles from "../scss/sign-up.module.scss";

const SignUp: React.FC = (): React.ReactElement => {
    return (
        <section className={`${section_styles.one_page} ${styles.register}`}>
            <h2>Register</h2>
            <RegisterForm />
            <ProtectRoute />
        </section>
    );
};

export default SignUp;
