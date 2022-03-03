import React, { useContext } from "react";
import section_styles from "../scss/sections.module.scss";
import styles from "../scss/new_skill.module.scss";
import EditSkillForm from "../components/EditSkillForm";
import ProtectRoute from "../components/ProtectRoute";
import { AuthContext } from "../helper/AuthProvider";

const EditSkill: React.FC = (): React.ReactElement => {
    const { AuthStatus } = useContext(AuthContext);

    return AuthStatus.Logged ? (
        <section className={`${section_styles.one_page} ${styles.new_skill}`}>
            <EditSkillForm />
        </section>
    ) : (
        <ProtectRoute type="registered" />
    );
};

export default EditSkill;
