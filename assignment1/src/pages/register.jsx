import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, FormGroup, Input, Label, CardBody } from 'reactstrap'
import Notification from "../components/Notification";

function Register() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ secondPassword, setSecondPassword ] = useState('');
    const [ buttonColour, setButtonColour ] = useState('danger');
    const [ message, setMessage ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ alertColour, setAlertColour ] = useState("primary");

    useEffect(() => {
        if (email && password && secondPassword && password === secondPassword) {
            setButtonColour('success');
        } else {
            setButtonColour('danger');
        }
    }, [email, password, secondPassword])

    function toggleAlert () {
        if (message==="User created") {
            setAlertColour("primary")
        } else if (message==="User already exists") {
            setAlertColour("warning")
        }
        setVisible(true);
 
        setTimeout(() => {
          setVisible(false);
        }, 3000);
    };

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

    return (
        <div className="Container">
            <Notification 
                message={message}
                visible={visible}
                alertColour={alertColour}
            />
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
                        onClick={() => {registerAPI(); toggleAlert();}}
                    >
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register;