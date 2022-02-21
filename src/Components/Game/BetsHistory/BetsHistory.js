import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useState } from "react";
import TableResults from "./TableResults/TableResults";
import './betsHistory.css';

const BetsHistory = () => {
    const [selectedButton, setSelectedButton] = useState('1');

    const buttons = [
        {name: 'All bets', value: 1},
        {name: 'Your history', value: 2}
    ];

    return (
        <div className="betsHistoryContainer">
            <ButtonGroup>
                {buttons.map((button) => (
                    <ToggleButton
                        key={button.value}
                        id={`button-${button.value}`}
                        type="radio"
                        variant={button.value % 2 ? 'outline-primary' : 'outline-secondary'}
                        name="betButton"
                        value={button.value}
                        checked={selectedButton == button.value}
                        onChange={(e) => setSelectedButton(e.currentTarget.value)}
                    >
                        {button.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <TableResults buttonSelected={selectedButton}/>
        </div>
    );
}

export default BetsHistory;