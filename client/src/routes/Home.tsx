import React, { Fragment, useContext } from "react";
import styles from "../scss/home.module.scss";
import section_styles from "../scss/sections.module.scss";
import img1 from "../pictures/img1.svg";
import { NavigateFunction, useNavigate } from "react-router";
import { AuthContext } from "../helper/AuthProvider";
import MySkills from "../components/MySkills";

const Home: React.FC = (): React.ReactElement => {
    const { AuthStatus } = useContext(AuthContext);

    const Navigate: NavigateFunction = useNavigate();

    const GoLogin: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        Navigate("/sign-up");
    };

    return (
        <section className={`${section_styles.one_page} ${styles.home}`}>
            {!AuthStatus.Logged ? (
                <Fragment>
                    <h2>
                        A place to keep track of your skills training progress
                    </h2>
                    <img src={img1} alt="" />
                    <button children="Create an account" onClick={GoLogin} />
                </Fragment>
            ) : (
                <MySkills />
            )}
        </section>
    );
};

export default Home;
