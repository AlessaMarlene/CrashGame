import { createContext, useState, useEffect } from "react";
import { getUsers } from "../utils/api/axios";
import pickRandomNumber from "../utils/GenerateRandomNumber/randomNumber";

const UsersContext = createContext();

const UsersProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [biggestWinner, setBiggestWinner] = useState({name:'', payout:0});
    const [balance, setBalance] = useState(localStorage.getItem('balance') | 0);

    const resetUsersBetInfo = () => {
        setUsers(users.map(user => {
            return {
                ...user,
                bet: pickRandomNumber(10, 1000)
            }
        }));
    }

    const calculateBalance = (payout) => {
        const currentBalance = (parseFloat(balance) + parseFloat(payout)).toFixed(2);
        setBalance(currentBalance);
        currentBalance && localStorage.setItem('balance', currentBalance);
    }

    useEffect(() => {
        async function loadUsers(){
            setUsers((await getUsers()).map(user => {
                return {
                    id: user.id,
                    user: user.username,
                    bet: pickRandomNumber(10, 1000),
                    mult: '',
                    payout:0
                }
            }));
        }

        loadUsers();
    }, []);

    return (
        <UsersContext.Provider value={{
            users,
            resetUsersBetInfo,
            biggestWinner: {
                name: biggestWinner.name,
                payout: biggestWinner.payout,
                set: setBiggestWinner,
            },
            mainUserBalance: {
                updateBalance: calculateBalance,
                currentBalance: balance
            }
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export {UsersContext, UsersProvider};