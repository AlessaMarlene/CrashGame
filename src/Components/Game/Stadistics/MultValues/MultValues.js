import { Table } from "react-bootstrap";
import { useContext } from "react";
import { HistoryContext } from "../../../Context/HistoryContext";
import './multHistory.css';

const MultValues = () => {
    const { history } = useContext(HistoryContext);

    return ( 
        <div className="multHistory">
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>LAST MULTIPLIER VALUES</th>
                    </tr>
                </thead>
                <tbody>
                    {history.crashingValues.map((crashValue, id) =>
                        <tr key={id}>
                            <td>{crashValue}x</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default MultValues;