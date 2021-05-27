import React from "react";
import { useSelector } from "react-redux";
import "./NavigationLinks.css";
import NavigationLink from "./NavigationLink/NavigationLink";
import { Fragment } from "react";

const NavigationLinks = (props) => {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);

    const linksForLoggedUser = () => {
        return (
            <Fragment>
                <NavigationLink link="/admin/competitions">
                    Moje zawody
                </NavigationLink>
                <NavigationLink link="/logout">Wyloguj</NavigationLink>
            </Fragment>
        );
    };

    const linksForUnknownUser = () => {
        return <NavigationLink link="/login">Zaloguj się</NavigationLink>;
    };

    return (
        <ul className="NavigationLinks">
            <NavigationLink link="/" exact>
                Strona startowa
            </NavigationLink>
            <NavigationLink link="/competitions">Lista zawodów</NavigationLink>
            <NavigationLink link="/competitors">
                Ranking zawodników
            </NavigationLink>
            <NavigationLink link="/score">Wprowadź wyniki</NavigationLink>
            {isAuthenticated ? linksForLoggedUser() : linksForUnknownUser()}
        </ul>
    );
};

export default NavigationLinks;
