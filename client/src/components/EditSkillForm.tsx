import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import styles from "../scss/new_skill.module.scss";
import form_styles from "../scss/form.module.scss";
import { FirstLetterToUppercase } from "../utilities";
import InfoCard from "./InfoCard";
import axios from "axios";
import { header } from "../helper/header";
import { useNavigate, useParams } from "react-router-dom";

const EditSkillForm: React.FC = (): React.ReactElement => {
    const [name, setName] = useState<string>("");
    const [value, setValue] = React.useState<number>(0);

    const { id } = useParams<string>();

    useEffect(() => {
        const dol = async () => {
            const { data } = await axios.get(
                `http://192.168.1.64:3001/skills/${id}`,
                header
            );
            setName(data.name);
            setValue(data.progress);
        };

        dol();
    }, [id]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };
    const InputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => setValue(parseInt(e.target.value));
    const NameChange: React.ChangeEventHandler<HTMLInputElement> = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => setName(e.target.value);

    interface IDataForm {
        name: string;
        progress: number;
        id: any;
    }
    const Navigate = useNavigate();

    const [NameEmpty, setNameEmpty] = useState<boolean>(false);
    const [skillCreated, setSkillCreated] = useState(false);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        const DataForm: IDataForm = {
            name: FirstLetterToUppercase(name.trim()),
            progress: value,
            id: id,
        };

        if (!DataForm.name.trim()) return setNameEmpty(true);
        setNameEmpty(false);
        try {
            const { data } = await axios.post(
                "http://192.168.1.64:3001/skills/modify",
                DataForm,
                header
            );

            if (data.SkillModified) {
                setSkillCreated(true);
                setTimeout(() => Navigate("/"), 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className={form_styles.form} onSubmit={onSubmit}>
            <p>Name</p>
            <input
                value={name}
                placeholder="Tenis"
                onChange={NameChange}
                type="text"
            />
            <span className={styles.mix}>
                <Slider color="primary" value={value} onChange={handleChange} />
                <input
                    type="number"
                    value={value}
                    onChange={InputChange}
                    className={styles.number}
                    max="100"
                    min="0"
                />
            </span>
            <button type="submit" children="save" />
            {NameEmpty && (
                <InfoCard title="Skill Name can not be empty" colour="red" />
            )}
            {skillCreated && <InfoCard title="Skill Modified" colour="green" />}
        </form>
    );
};

export default EditSkillForm;
