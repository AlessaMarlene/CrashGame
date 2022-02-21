import { Button } from "react-bootstrap";
import { useContext } from "react";
import { HistoryContext } from "../../../Context/HistoryContext";

const CashOutButton = ({provideMainUserBet, multValue}) => {
    const {history} = useContext(HistoryContext);

    const handleClick = () => {
        const mainUserBet = provideMainUserBet(false);
        if (mainUserBet != null) {
            history.addWinner(multValue, mainUserBet);
            history.addMainUsersBet(mainUserBet);
        }
    }

    return (
        <div className="d-grid gap-2">
            <Button onClick={handleClick} size='lg' variant='outline-primary' >
                Cash out
            </Button>
        </div>
    );
}

export default CashOutButton;