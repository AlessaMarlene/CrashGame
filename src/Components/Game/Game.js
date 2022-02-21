import { useState } from 'react';
import Stadistics from './Stadistics/Stadistics';
import MainGame from './MainGame/MainGame';
import BetsHistory from './BetsHistory/BetsHistory';
import UserDataModal from './UserDataModal/UserDataModal';
import Header from '../Header/Header';
import './game.css';

const Game = () => {
    const initialState = localStorage.getItem('name') !== null;
    const [isUserRegistered, setIsUserRegistered] = useState(initialState);

    return (
        <div className='mainContainer'>
            <Header/>
            <div>
                <UserDataModal 
                    show={!isUserRegistered} 
                    onHide={() => setIsUserRegistered(true)}
                />
                <div className='allGameContent'>
                    <Stadistics/>
                    <MainGame isUserRegistered={isUserRegistered}/>
                    <BetsHistory/>
                </div>
            </div>
        </div>
    );
}

export default Game;