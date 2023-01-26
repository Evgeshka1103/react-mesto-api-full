import logo from '../images/logo.svg';

import { Switch, Route, Link } from 'react-router-dom';

export default function Header({ email, handleSignOut }) {

    return (

        <header className="header">

            <img
                className="header__logo"
                src={logo}
                alt="Логотип" />
                
            <Switch>

                <Route exact path="/">
                    <div className="header__block-user">
                        <h4
                            className="header__email">
                            {email}
                        </h4>
                        <Link
                            className="header__link"
                            to="/sign-in"
                            onClick={handleSignOut}>
                            Выйти
                        </Link>
                    </div>

                </Route>
                <Route path="/sign-up">
                    <Link
                        className="header__link"
                        to="/sign-in">
                        Войти
                    </Link>
                </Route>

                <Route path="/sign-in">
                    <Link
                        className="header__link"
                        to="/sign-up">
                        Регистрация
                    </Link>
                </Route>

            </Switch>

        </header>
    )
}