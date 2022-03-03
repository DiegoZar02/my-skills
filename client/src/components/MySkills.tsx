import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { header } from "../helper/header";
import no_data from "../pictures/undraw_no_data_re_kwbl.svg";
import styles from "../scss/home.module.scss";

const MySkills: React.FC = (): React.ReactElement => {
    const Navigate: NavigateFunction = useNavigate();

    interface ISkill {
        id: number;
        name: string;
        progress: number;
        createdAt: string;
        updatedAt: string;
    }

    const [Skills, setSkills] = useState<Array<ISkill>>([]);

    useEffect(() => {
        const dol = async () => {
            const { data } = await axios.get(
                "http://192.168.1.64:3001/skills",
                header
            );

            setSkills(data.ListOfSkills);
        };
        dol();
    }, []);

    return (
        <Fragment>
            {Skills.length > 0 ? (
                <Fragment>
                    <ul>
                        {Skills.map((skill) => (
                            <li
                                key={skill.id}
                                onClick={() => Navigate(`/skill/${skill.id}`)}
                            >
                                <p>{skill.name}</p>
                                <p>{skill.progress}%</p>
                                <span
                                    style={{ width: `${skill.progress}%` }}
                                    className={styles.bg}
                                ></span>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={styles.new_skill}
                        children="Add a Skill"
                        onClick={() => Navigate("/skill/new")}
                    />
                </Fragment>
            ) : (
                <Fragment>
                    <h2>
                        It looks like you do not have registered any skill yet.
                    </h2>
                    <img
                        src={no_data}
                        className={styles.no_data}
                        alt="no data"
                    />
                    <button
                        children="Add a Skill"
                        onClick={() => Navigate("/skill/new")}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};

export default MySkills;
