import React, { ReactNode } from "react";
import styles from "../scss/cards.module.scss";

type colour = "red" | "green";
interface Props {
    children?: ReactNode;
    title?: string | any;
    colour?: colour;
}

const InfoCard: React.FC<Props> = ({
    children,
    title = "This is a Tilte",
    colour,
}): React.ReactElement => {
    let card_colour = null;

    switch (colour) {
        case "red":
            card_colour = styles.red_card;
            break;
        case "green":
            card_colour = styles.green_card;
            break;
        default:
            break;
    }

    return (
        <div className={`${styles.card} ${card_colour}`}>
            <h3 className={styles.text}>{title}</h3>
            {children}
        </div>
    );
};

export default InfoCard;
