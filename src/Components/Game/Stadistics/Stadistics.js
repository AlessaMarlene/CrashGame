import BiggestWinner from "./BiggestWinner/BiggestWinner";
import MultValues from "./MultValues/MultValues";
import './stadistics.css';

const Stadistics = () => {
    return ( 
        <div className="stadisticsContainer">
            <BiggestWinner/>
            <MultValues/>
        </div>
    );
}

export default Stadistics;