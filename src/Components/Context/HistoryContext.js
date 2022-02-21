import { createContext, useState, useContext } from "react";
import pickRandomNumber from "../utils/GenerateRandomNumber/randomNumber";
import { UsersContext } from "./UsersContext";

const HistoryContext = createContext();

const HistoryProvider = ({children}) => {
    const {users, biggestWinner, resetUsersBetInfo} = useContext(UsersContext);
    const [roundWinners, setRoundWinners] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [mainUserHistoryData, setMainUserHistoryData] = useState([]);
    const [lastCrashingValues, setLastCrashingValues] = useState([]);

    const addToHistory = (newData) => {
        let historyDataCopy = [...historyData];
        const newDataArray = Array.isArray(newData) ? [...newData] : [newData];

        for(let i = 0; i < newDataArray.length; i++) {
            historyDataCopy.unshift(newDataArray[i]);

            if(historyDataCopy.length > 20) historyDataCopy.pop();
        }
        
        setHistoryData([...historyDataCopy]);

        if(newDataArray[0].payout > biggestWinner.payout) {
            biggestWinner.set({name: newDataArray[0].user, payout: newDataArray[0].payout})
        };
    }

    const addAWinnerToHistory = (multValue, mainUser = null) => {
        if(mainUser != null) addToHistory(mainUser);
        else{
            const randomUserIndex = pickRandomNumber(0, users.length - 1, true);
            const newWinner = users[randomUserIndex];
    
            if (!roundWinners.some(user => user.id == newWinner.id)) {
                const winner = {
                    ...newWinner,
                    mult: `${multValue.toFixed(1)}x`,
                    payout: parseFloat((newWinner.bet * multValue).toFixed(2))
                };
                
                setRoundWinners([...roundWinners, winner]);
                const historyHasFirstWinner = historyData.some(user => user.payout > 0);
    
                if(!historyHasFirstWinner) biggestWinner.set(winner);
                
                addToHistory(winner);
            }
        }
    }

    const addLosersToHistory = (multValue, mainUser = null) => {
        const losers = users.filter(user => !roundWinners.some(winnerUser => winnerUser.id == user.id)).map(loser => {
            return {
                ...loser,
                mult: `${multValue}x`,
                payout: (loser.bet * (-1)).toFixed(2)
            }
        });
    
        if (mainUser != null) {
            addToHistory([...losers, mainUser]);
            addBetToMainUserHistory(mainUser);
        }
        else addToHistory([...losers]);

        resetUsersBetInfo();
        setRoundWinners([]);
    }

    const addBetToMainUserHistory = (mainUser) => {
        if(mainUserHistoryData.length === 20) mainUserHistoryData.pop();

        setMainUserHistoryData([mainUser, ...mainUserHistoryData]);
    }

    const addToCrashingValuesHistory = (mult) => {
        if(lastCrashingValues.length === 7) lastCrashingValues.pop();

        setLastCrashingValues([mult, ...lastCrashingValues]);
    }

    return (
        <HistoryContext.Provider value={{
            history: {
                data: historyData,
                mainUserData: mainUserHistoryData,
                crashingValues: lastCrashingValues,
                addLosers: addLosersToHistory,
                addWinner: addAWinnerToHistory,
                addMainUsersBet: addBetToMainUserHistory,
                addToCrashingValues: addToCrashingValuesHistory
            }
        }}>
            {children}
        </HistoryContext.Provider>
    );
}

export {HistoryProvider, HistoryContext};