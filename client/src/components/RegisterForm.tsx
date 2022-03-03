import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../scss/form.module.scss";
import { FirstLetterToUppercase } from "../utilities";
import InfoCard from "./InfoCard";

const RegisterForm: React.FC = (): React.ReactElement => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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

    const [EmptyFields, setEmptyFields] = useState<Array<string>>([]);
    const [UserCreated, setUserCreated] = useState<Boolean | string>(false);
    const [Error, setError] = useState<Boolean | string>(false);

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
            setUserCreated(false);
            return;
        }
        setEmptyFields([]);
        try {
            const { data } = await axios.post(
                "http://192.168.1.64:3001/auth/sign-up",
                DataForm
            );
            if (data.userCreated) {
                setUserCreated(data.msg);
                setTimeout(() => setUserCreated(false), 2000);
            }
            if (!data.userCreated) {
                setError(data.message);
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
                to="/sign-in"
                children="Already have an account?, Login instead"
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
            {UserCreated && <InfoCard title={UserCreated} colour="green" />}
            {Error && <InfoCard title={Error} colour="red" />}
        </form>
    );
};

export default RegisterForm;
