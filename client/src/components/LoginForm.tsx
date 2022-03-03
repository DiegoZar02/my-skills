import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helper/AuthProvider";
import { FirstLetterToUppercase } from "../utilities";
import InfoCard from "./InfoCard";
import styles from "../scss/form.module.scss";

const LoginForm: React.FC = (): React.ReactElement => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [EmptyFields, setEmptyFields] = useState<Array<string>>([]);
    const [LoginSuccess, setLoginSuccess] = useState<Boolean | null>(null);
    const { setAuthStatus } = useContext(AuthContext);

    const Navigate = useNavigate();

    const ChangeUserField: React.ChangeEventHandler<HTMLInputElement> = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(e.target.value);
    };
    const ChangePassField: React.ChangeEventHandler<HTMLInputElement> = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(e.target.value);
    };

    interface IDataForm {
        username: string;
        password: string;
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const DataForm: IDataForm = {
            username: FirstLetterToUppercase(username.trim()),
            password: password.trim(),
        };

        const ErrorList: Array<string> = [];

        if (!DataForm.username.trim()) ErrorList.push("username");
        if (!DataForm.password.trim()) ErrorList.push("password");

        if (ErrorList.length > 0) {
            setEmptyFields(ErrorList);
            setLoginSuccess(null);
            return;
        }
        setEmptyFields([]);
        try {
            const { data } = await axios.post(
                "http://192.168.1.64:3001/auth/sign-in",
                DataForm
            );

            if (data.Logged) {
                setLoginSuccess(true);
                localStorage.setItem("accessToken", data.accessToken);
                setAuthStatus({
                    Logged: data.Logged,
                    userInfo: {
                        username: data.username,
                        id: data.id,
                    },
                });
                setTimeout(() => Navigate("/"), 250);
            } else {
                setLoginSuccess(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <span className={styles.input}>
                <p>Username</p>
                <input
                    type="text"
                    value={username}
                    onChange={ChangeUserField}
                    placeholder="username"
                />
            </span>
            <span className={styles.input}>
                <p>Password</p>
                <input
                    type="text"
                    value={password}
                    onChange={ChangePassField}
                    placeholder="password"
                />
            </span>
            <input className={styles.submit} type="submit" value="Send" />
            <Link
                className={styles.link}
                to="/sign-up"
                children="New to MySkills? Create an account."
            />
            {EmptyFields.length > 0 && (
                <InfoCard title="Error" colour="red">
                    <ul>
                        {EmptyFields.map((e, index) => (
                            <li key={index}>
                                {FirstLetterToUppercase(
                                    `${e} field can not be empty!`
                                )}
                            </li>
                        ))}
                    </ul>
                </InfoCard>
            )}
            {LoginSuccess && (
                <InfoCard title="Login Succesfully!" colour="green" />
            )}
            {LoginSuccess === false && (
                <InfoCard
                    title="Username or Password incorrect!"
                    colour="red"
                />
            )}
        </form>
    );
};

export default LoginForm;
