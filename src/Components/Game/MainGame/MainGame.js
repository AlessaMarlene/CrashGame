import { UsersContext } from "../../Context/UsersContext";
import { useState, useContext } from "react";
import MultiplierBox from "./MultiplierBox/MultiplierBox";
import BetBox from "./BetBox/BetBox";
import CashOutButton from "./CashOutButton/CashOutButton";
import './mainGame.css';

const MainGame = ({isUserRegistered}) => {
    const {mainUserBalance} = useContext(UsersContext);
    const [startGame, setStartGame] = useState(false);
    const [multValue, setMultValue] = useState(1);
    const [bet, setBet] = useState(0);

    function provideMainUserBet(userHasLost){
        let userBetInfo = null;

        if(bet > 0 && startGame){
            const userPayout = (userHasLost ? bet * (-1) : bet * multValue).toFixed(2);
            userBetInfo = {
                user: localStorage.getItem('name'),
                bet: bet,
                mult: `${multValue.toFixed(1)}x`,
                payout: userPayout
            };
            mainUserBalance.updateBalance(userPayout);
            setBet(0);
        }

        return userBetInfo;
    }

    return (
        <main className="mainGameContainer">
            <MultiplierBox 
                isUserRegistered={isUserRegistered}
                startOfGame={{
                    startGame: startGame,
                    setStartGame: setStartGame 
                }}
                multIncrement={{
                    increaseMult: setMultValue,
                    multValue: multValue
                }}
                provideMainUserBet={provideMainUserBet}
            />
            <BetBox 
                updateBet={setBet} 
                startGame={startGame}
            />
            <CashOutButton
                provideMainUserBet={provideMainUserBet}
                multValue={multValue}
            />
        </main>
    );
}

export default MainGame;