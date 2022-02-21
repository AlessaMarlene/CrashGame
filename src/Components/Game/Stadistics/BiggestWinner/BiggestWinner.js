import { useContext } from "react";
import { Card } from "react-bootstrap";
import './biggestWinner.css';
import { UsersContext } from "../../../Context/UsersContext";

const BiggestWinner = () => {
    const {biggestWinner} = useContext(UsersContext);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>A real winner!</Card.Header>
            <Card.Body>
                <Card.Img src={'assets/winner.svg'}/>
                <Card.Title>{biggestWinner.name}</Card.Title>
                <Card.Text>{biggestWinner.payout > 0 && biggestWinner.payout}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BiggestWinner;