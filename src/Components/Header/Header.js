import { useContext } from 'react';
import { UsersContext } from '../Context/UsersContext';
import './header.css';

const Header = () => {
    const mainUserName = localStorage.getItem('name');
    const {mainUserBalance} = useContext(UsersContext);

    return (  
        <header className='header'>
            <h4>User: {mainUserName}</h4>
            <h4>Balance: {mainUserBalance.currentBalance}</h4>
        </header>
    );
}

export default Header;