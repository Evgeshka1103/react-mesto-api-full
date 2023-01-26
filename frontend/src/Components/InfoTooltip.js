import React from "react"
import success from "../images/success.png";
import err from "../images/err.png";

export default function InfoTooltip({ onClose, isStatus, isOpen }) {

    const loginResult = {
        successResult: 'Вы успешно зарегистрировались!',
        errorResult: 'Что-то пошло не так! Попробуйте ещё раз.'
    }

    return (

        <div className={`popup ${isOpen ? `popup__opened` : ''}`}>
            <div className="popup__container">
                <div className="popup__form">

                    <button
                        type="button"
                        className="popup__button-close"
                        onClick={onClose}
                    ></button>

                    <img
                        className="popup__tooltip-icon"
                        src={isStatus ? success : err}
                        alt="" />

                    <h3 className="popup__tooltip-text">
                        {isStatus ? loginResult.successResult : loginResult.errorResult}
                    </h3>
                </div>
            </div>
        </div>
    )
}