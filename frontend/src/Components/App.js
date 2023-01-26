import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../Context/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import '../App.css';

import * as auth from '../utils/Auth';
import api from '../utils/Api';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupWithConfirmationOpen, setIsPopupWithConfirmationOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
          }
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsImagePopupOpen(true);
  };

  function handleConfirmationDeleteClick(selectedCard) {
    setSelectedCard(selectedCard);
    setIsPopupWithConfirmationOpen(true);
  };

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupWithConfirmationOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  };

  function handleUpdateUser(data) {
    api.patchUserInfoData(data)
      .then(userData => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  function handleUpdateAvatar(data) {
    api.patchUserAvatarData(data)
      .then(userData => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  function handleAddPlaceSubmit(data) {
    api.postUserCardData(data)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((i) => i._id === card._id ? newCard : i));
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  function handleDeletecard(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter((i) => i._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  function handleRegisterUser(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsStatus(true);
        history.push('/sign-in');
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        handleInfoTooltipOpen();
      })
  };

  function handleLoginUser(email, password) {
    auth.login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setUserEmail(email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          handleSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path='/'
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={handleConfirmationDeleteClick}
            onClickCard={handleCardClick}
            onLikeCard={handleCardLike}
            cards={cards}
          />
          <Route path='/sign-up'>
            <Register handleRegisterUser={handleRegisterUser} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLoginUser={handleLoginUser} />
          </Route>
          <Route path='/'>
            {!isStatus ? <Redirect to='/sign-in' /> : <Redirect to='/' />}
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isStatus={isStatus}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <PopupWithConfirmation
          isOpen={isPopupWithConfirmationOpen}
          onClose={closeAllPopups}
          onSubmitDeleteCard={handleDeletecard}
          card={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};