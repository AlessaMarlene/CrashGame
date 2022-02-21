import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useContext, useState } from "react";
import { UsersContext } from "../../Context/UsersContext";
import './userDataModal.css';

const UserDataModal = (props) => {
    const { mainUserBalance } = useContext(UsersContext);
    const [userData, updateUserData] = useState({name: '', balance: 0});
    const [errors, setErrors] = useState({name: null, balance: null});

    const handleChange = (e) => {
        setErrors({name: null, balance: null});
        updateUserData({...userData, [e.target.name]: e.target.value.trim()});
    }

    const handleSubmit = () => {
        const newErrors = {
            name: null,
            balance: null
        }
        newErrors.balance = userData.balance <= 0 ? 'Balance is invalid.' : null;
        newErrors.name = userData.name.length <= 2 ? 'Name should have more than 2 characters' : null;

        if (!newErrors.name && !newErrors.balance) {
            localStorage.setItem('name', userData.name);
            mainUserBalance.updateBalance(parseFloat(userData.balance).toFixed(2))
            props.onHide();
        } else {
            setErrors(newErrors);
        }
    }

    return ( 
        <Modal 
            {...props} 
            size='lg' 
            aria-labelledby="contained-modal-title-vcenter" 
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Welcome to Crash Game!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Enter your name and balance</h4>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                    <FormControl
                        name='name'
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        minLength={2}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Balance</InputGroup.Text>
                    <FormControl
                        type='number'
                        name='balance'
                        placeholder={userData.balance}
                        onChange={handleChange}
                        aria-describedby="basic-addon1"
                        min={1}
                    />
                </InputGroup>
                    { (errors.name != null) && <p className="text-danger">{errors.name}</p>}
                    { (errors.balance != null) && <p className="text-danger">{errors.balance}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Start</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserDataModal;