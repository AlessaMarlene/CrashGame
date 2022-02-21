import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import './userDataModal.css';

const UserDataModal = (props) => {
    const [userData, updateUserData] = useState({name: '', balance: 0});

    const handleChange = (e) => {
        updateUserData({...userData, [e.target.name]: e.target.value.trim()});
    }

    const handleSubmit = () => {
        localStorage.setItem('name', userData.name);
        localStorage.setItem('balance', parseFloat(userData.balance).toFixed(2));
        props.onHide();
    }

    return ( 
        <Modal 
            {...props} 
            size='lg' 
            aria-labelledby="contained-modal-title-vcenter" 
            centered
        >
            <Modal.Header closeButton>
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
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Start</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserDataModal;