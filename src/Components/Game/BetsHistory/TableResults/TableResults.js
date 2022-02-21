import { Table } from "react-bootstrap";
import { useContext } from "react";
import { HistoryContext } from "../../../Context/HistoryContext";
import './tableResults.css';

const TableResults = ({buttonSelected}) => {
    const { history } = useContext(HistoryContext);

    const getDataToMap = () => buttonSelected == 1 ? history.data : history.mainUserData;

    return (
        <div className="historyResults">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Bet</th>
                        <th>Mult</th>
                        <th>Payout</th>
                    </tr>
                </thead>
                <tbody>
                    {getDataToMap().map((user, id) =>
                        <tr key={id}>
                            <td>{user.user}</td>
                            <td>{user.bet}</td>
                            <td>{user.mult}</td>
                            <td style={{color: user.payout < 0 ? 'red' : 'green'}}>{user.payout}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default TableResults;