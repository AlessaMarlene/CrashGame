import { useContext, useState, useEffect } from 'react';
import { UsersContext } from '../Context/UsersContext';

import Stadistics from './Stadistics/Stadistics';
import MainGame from './MainGame/MainGame';
import BetsHistory from './BetsHistory/BetsHistory';
import UserDataModal from './UserDataModal/UserDataModal';
import Header from '../Header/Header';


import './game.css';

const Game = () => {
    const {mainUserBalance } = useContext(UsersContext);
    const mainUserName = localStorage.getItem('name');
    const [availableToPlay, setAvailableToPlay] = useState(mainUserName && mainUserBalance.currentBalance > 0);


    useEffect(() => {
        setAvailableToPlay(mainUserBalance.currentBalance > 0)
    }, [mainUserBalance])

    return (
        <div className='mainContainer'>
            <Header/>
            <div>
                <UserDataModal 
                    show={!availableToPlay} 
                    onHide={() => setAvailableToPlay(true)}
                />
                <div className='allGameContent'>
                    <Stadistics/>
                    <MainGame isUserRegistered={availableToPlay}/>
                    <BetsHistory/>
                </div>
            </div>
        </div>
    );
}

export default Game;