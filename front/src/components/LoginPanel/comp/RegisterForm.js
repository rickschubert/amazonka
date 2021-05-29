import React, { useState } from "react";
import "./RegisterForm.css";
import Button from "../../UI/Button/Button";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!) {
        register(username: $username, password: $password) {
            user_id
        }
    }
`;

const RegisterForm = (props) => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [reasonForCreatingAccount, setReasonForCreatingAccount] =
        useState("");

    const [registerUser] = useMutation(REGISTER_USER, {
        onError(err) {
            console.log(err);
        },
    });

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleReasonForCreatingAccount = (event) => {
        setReasonForCreatingAccount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email) &&
            password1 &&
            password2 === password1
        ) {
            registerUser({
                variables: {
                    username: login,
                    password: password1,
                },
            });
        }
    };

    return (
        <form data-testid="registerForm" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Login"
                className="form-control register-input"
                value={login}
                onChange={handleLoginChange}
            />{" "}
            <br />
            <input
                type="text"
                placeholder="Email"
                className="form-control register-input"
                value={email}
                onChange={handleEmailChange}
            />{" "}
            <br />
            <input
                type="password"
                placeholder="Hasło"
                className="form-control register-input"
                value={password1}
                onChange={handlePassword1Change}
            />{" "}
            <br />
            <input
                type="password"
                placeholder="Powtórz hasło"
                className="form-control register-input"
                value={password2}
                onChange={handlePassword2Change}
            />{" "}
            <br />
            <textarea
                placeholder="Dlaczego chcesz założyć konto?"
                className="form-control register-input"
                rows="5"
                value={reasonForCreatingAccount}
                onChange={handlereasonForCreatingAccount}
            />{" "}
            <br />
            <Button
                type="submit"
                className="btn btn-primary btn-lg"
                placeholder="Zarejestruj się"
            />
        </form>
    );
};

export default RegisterForm;
