import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, Modal, ModalFooter, FormGroup, ModalBody, Input, Label, CardBody } from 'reactstrap'

function Register() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ secondPassword, setSecondPassword ] = useState('');
    const [ buttonColour, setButtonColour ] = useState('danger');
    const [ modal, setModal ] = useState(false);
    const [ message, setMessage ] = useState([]);

    useEffect(() => {
        if (email && password && secondPassword && password === secondPassword) {
            setButtonColour('success');
        } else {
            setButtonColour('danger');
        }
    }, [email, password, secondPassword])

    function registerAPI() {
        const url = 'http://sefdb02.qut.edu.au:3000/user/register';

        return (
            fetch((url), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    setMessage(res.message)
                })
                .catch((error) => {
                    console.log(error)
                    setMessage(error.message)
                })
        )
    }
    
    function toggleModal() {
        setModal(!modal);
    }

    return (
        <div className="Container">
            <Card
                style={{
                    width: '40vw'
                  }}
            >
                <CardBody>
                    <h3>Registration</h3>
                </CardBody>
                <CardBody>
                    <FormGroup floating>
                        <Input 
                            id="exampleEmail"
                            name="email"
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label for="exampleEmail">
                            Email
                        </Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input 
                            id="examplePassword"
                            name="password"
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Label for="examplePassword">
                            Password
                        </Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input 
                            id="exampleConfirmPassword"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            value={secondPassword}
                            type="confirmpassword"
                            onChange={(e) => setSecondPassword(e.target.value)}
                        />
                        <Label for="exampleConfirmPassword">
                            Confirm Password
                        </Label>
                    </FormGroup>
                </CardBody>
                <CardBody style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button 
                        color={buttonColour} 
                        disabled={buttonColour === 'danger'}
                        onClick={() => {registerAPI(); toggleModal();}}
                    >
                        Submit
                    </Button>
                </CardBody>
            </Card>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalBody>
                    <h2>{message}</h2> 
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggleModal}>
                    Close
                </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Register;