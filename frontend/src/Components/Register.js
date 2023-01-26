import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegisterUser }) {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function handleEmailChange(e) {
        setUserEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setUserPassword(e.target.value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const email = userEmail;
        const password = userPassword;

        handleRegisterUser(email, password);
    }


    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleFormSubmit}>

                <div className="auth__field">
                    <input

                        type="email"
                        id="input-email"
                        className="auth__input_email"
                        placeholder="email"
                        value={userEmail}
                        name="email"
                        minLength="6"
                        maxLength="40"
                        onChange={handleEmailChange}
                        required />
                    <span
                        className="error" />
                </div>

                <div className="auth__field">
                    <input
                        type="password"
                        id="input-password"
                        className="auth__input_password"
                        placeholder="password"
                        value={userPassword}
                        name="password"
                        minLength="6"
                        maxLength="40"
                        onChange={handlePasswordChange}
                        required />
                    <span
                        className="error" />
                </div>
                <button
                    type="submit"
                    className="auth__button">
                    Зарегистрироваться
                </button>
            </form>
            <div className="auth__register">
                <p>Уже зарегистрированы?</p>
                <Link
                    className="auth__login"
                    to="/sign-in">
                    Войти
                </Link>
            </div>
        </div>
    )
}