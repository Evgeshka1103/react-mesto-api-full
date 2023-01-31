import React, { useContext } from 'react';
import { CurrentUserContext } from '../Context/CurrentUserContext';

export default function Card({ card, onClickCard, onDeleteCard, onLikeCard }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser.id;
    const buttonDeleteCardClassName = (`${isOwn ? 'elements__delete_active' : 'elements__delete'}`);

    const isLiked = card.likes.some(element => element === currentUser._id);
    const buttonLikeCardClassName = (`${isLiked ? 'elements__like_active' : 'elements__like'}`);

    function handleCardClick() {
        onClickCard(card);
    }

    function handleDeleteClick() {
        onDeleteCard(card);
    }

    function handleLikeClick() {
    onLikeCard(card);
    }

return (
        <div className="elements__card" key={card._id}>
            <img className="elements__mask-group" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="elements__text">
                <h2 className="elements__sight">{card.name}</h2>
                <div className="elements__likes-number">
                    <button className={buttonLikeCardClassName} onClick={handleLikeClick} />
                    <h4 className="elements__number-like">{card.likes.length}</h4>
                </div>
            </div>
            <button className={buttonDeleteCardClassName} onClick={handleDeleteClick} /> 
        </div>
    )
}





