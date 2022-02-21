import { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import './betBox.css';

const BetBox = ({updateBet, startGame}) => {
    const [amountToBet, setAmountToBet] = useState(0);
    const [disableButton, setDisableButton] = useState(false);
    const [invalidBet, setInvalidBet] = useState(false);

    useEffect(() => {
        if(!startGame) setDisableButton(false);
    }, [startGame])
    
    const handleChange = (e) => {
        setInvalidBet(false);
        setAmountToBet(e.target.value);
    }

    const handleSubmit = () => {
        const currentBalance = parseFloat(localStorage.getItem('balance'));
        
        if(amountToBet <= currentBalance && amountToBet > 0){
            if(invalidBet) setInvalidBet(false);
            
            setDisableButton(true);
            updateBet(amountToBet);
        }
        else setInvalidBet(true);
    }
    
    return (
        <div className="betBox">
            <InputGroup className="mb-3">
                <FormControl
                    type='number'
                    placeholder={0}
                    onChange={handleChange}
                    isInvalid={invalidBet}
                />
                <Button
                    onClick={handleSubmit}
                    variant="outline-primary"
                    disabled={startGame || disableButton}
                >
                    Place bet
                </Button>
            </InputGroup>
            {
                (invalidBet && !startGame) && <p className="betErrorMsg">The amount to bet is invalid or your current balance is not enough.Try again</p>
            }
        </div>
    );
}

export default BetBox;