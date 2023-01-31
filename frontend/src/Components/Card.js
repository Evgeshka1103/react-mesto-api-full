import React, { useContext } from 'react';
//import { CurrentUserContext } from '../Context/CurrentUserContext';

export default function Card(props) {
  // const currentUser = useContext(CurrentUserContext);
   const isOwn = props.card.owner === props.id; 
   const buttonDeleteCardClassName = (`elements__delete ${isOwn ? '' : 'elements__delete_hidden'}`); 

   const isLiked = props.card.likes.some(element => element._id === props.id); 
   const buttonLikeCardClassName = (`elements__like ${isLiked ? 'elements__like_active' : ''}`);

    function handleCardClick() {
        props.onClickCard(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteCard(props.card);
    }

    function handleLikeClick() {
        props.onLikeCard(props.card);
    } 

return (
        <div className="elements__card">
            <img className="elements__mask-group" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
            <div className="elements__text">
                <h2 className="elements__sight">{props.card.name}</h2>
                <div className="elements__likes-number">
                    <button className={buttonLikeCardClassName} onClick={handleLikeClick} />
                    <h4 className="elements__number-like">{props.card.likes.length}</h4>
                </div>
            </div>
            <button className={buttonDeleteCardClassName} onClick={handleDeleteClick} /> 
        </div>
    )
}





