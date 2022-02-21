import { useState, useContext } from "react";
import { HistoryContext } from "../../../Context/HistoryContext";
import pickRandomNumber from "../../../utils/GenerateRandomNumber/randomNumber";
import Multiplier from "./Multiplier/Multiplier";
import './multiplierBox.css';

const totalUsers = 10;

const MultiplierBox = ({isUserRegistered, startOfGame, multIncrement, provideMainUserBet}) => {
    const [multCrashValue, setMultCrashValue] = useState(0);
    const [timesWhenWinning, setTimesWhenWinning] = useState([]);
    const { history } = useContext(HistoryContext);

    function initializeValuesToStartNewRound(){
        const newMultCrashValue = pickRandomNumber();
        const randomTotalWinners = pickRandomNumber(1, totalUsers, true);
        const timeFromStartToCrash = newMultCrashValue - multIncrement.multValue;
        const timeRangeToWin = timeFromStartToCrash / randomTotalWinners;
        const exactTimesWhenAWinnerIsShown = [...new Array(randomTotalWinners)].reduce((pValue, cValue, i) => {
            if (i > 0) {
                pValue.push((parseFloat(pValue[i-1]) + timeRangeToWin).toFixed(1));
            }
            
            return pValue;
        }, [parseFloat(multIncrement.multValue + timeRangeToWin).toFixed(1)]);

        setTimesWhenWinning(exactTimesWhenAWinnerIsShown);
        setMultCrashValue(newMultCrashValue);
        startOfGame.setStartGame(true);
    }

    function multHasCrashed(){
        const mainUserBet = provideMainUserBet(true);
                
        if(mainUserBet != null) history.addLosers(multIncrement.multValue, mainUserBet);
        else history.addLosers(multIncrement.multValue);

        history.addToCrashingValues(multCrashValue);
        startOfGame.setStartGame(false);
        multIncrement.increaseMult(1);
    }

    function increaseMultiplier(){
        setTimeout(() => {
            const currentMult = Math.round((multIncrement.multValue + 0.1) * 100) / 100;

            if (timesWhenWinning.includes(currentMult.toString())) {
                history.addWinner(currentMult);
            }

            multIncrement.increaseMult(currentMult);
        }, 100);
    }
        
    return (
        <div>
            <Multiplier 
                initializeValues={initializeValuesToStartNewRound}
                multValue={multIncrement.multValue}
                startGame={startOfGame.startGame}
                isUserRegistered={isUserRegistered}
                multCrashValue={multCrashValue}
                multHasCrashed={multHasCrashed}
                timesWhenWinning={timesWhenWinning}
                increaseMultiplier={increaseMultiplier}
            />

            {
                !startOfGame.startGame && 
                    <div className="infoContainer">
                        <img src={'https://alessamarlene.github.io/CrashGame-public/assets/info.svg'}/>
                        <p className="info">5 seconds until the next round. Be sure to bet on time!</p>
                    </div>
            }
        </div>
    );
}

export default MultiplierBox;