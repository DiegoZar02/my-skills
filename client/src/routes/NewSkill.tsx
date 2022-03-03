import React, { useContext } from "react";
import NewSkillForm from "../components/NewSkillForm";
import section_styles from "../scss/sections.module.scss";
import styles from "../scss/new_skill.module.scss";
import ProtectRoute from "../components/ProtectRoute";
import { AuthContext } from "../helper/AuthProvider";

const NewSkill: React.FC = (): React.ReactElement => {
    const { AuthStatus } = useContext(AuthContext);
    return AuthStatus.Logged ? (
        <section className={`${section_styles.one_page} ${styles.new_skill}`}>
            <NewSkillForm />
        </section>
    ) : (
        <ProtectRoute type="registered" />
    );
};

export default NewSkill;
