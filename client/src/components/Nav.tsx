import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../scss/nav.module.scss";
import { RiBarChartFill } from "react-icons/ri";
import { AuthContext } from "../helper/AuthProvider";

interface NavLinkProps {
    to: string;
    children:
        | React.ReactNode
        | ((props: { isActive: boolean }) => React.ReactNode);
}

const MyNavLink: React.FC<NavLinkProps> = ({
    to,
    children,
}): React.ReactElement => {
    return (
        <NavLink
            to={to}
            children={children}
            className={({ isActive }) => (isActive ? styles.active : "")}
        />
    );
};

const Nav: React.FC = (): React.ReactElement => {
    const { AuthStatus, setAuthStatus } = useContext(AuthContext);

    const SingOut: React.MouseEventHandler<HTMLButtonElement> = (): void => {
        localStorage.removeItem("accessToken");
        setAuthStatus({
            Logged: false,
            userInfo: null,
        });
    };

    return (
        <nav className={styles.nav}>
            <Link className={styles.brand} to="/">
                <RiBarChartFill />
                MySkills
            </Link>
            <ul>
                <li>
                    <MyNavLink to="/" children="Home" />
                    {!AuthStatus.Logged ? (
                        <MyNavLink to="/sign-in" children="Login" />
                    ) : (
                        <button onClick={SingOut} children="Log out" />
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
