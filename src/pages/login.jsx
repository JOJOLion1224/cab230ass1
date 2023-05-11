import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Button, FormGroup, Input, Label, CardBody } from 'reactstrap'
import { useAuth } from '../helpers/AuthenticationContext';

function Login() {
    const { setIsLoggedIn } = useAuth();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ buttonColour, setButtonColour ] = useState('danger');
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ message, setMesssage ] = useState("");
    const [ visible, setVisible ] = useState(false);
    const [ alertColour, setAlertColour ] = useState("");

    useEffect(() => {
        if (email && password ) {
            setButtonColour('success');
        } else {
            setButtonColour('danger');
        }
    }, [email, password])

    function toggleAlert () {
        setVisible(true);
 
        setTimeout(() => {
          setVisible(false);
        }, 3000);
    };

    async function LoginAPI() {
        const url = 'http://sefdb02.qut.edu.au:3000/user/login';

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
        });

        const data = await response.json();
        
        if (response.status === 401) {
            setMesssage("Incorrect email or password");
            setAlertColour("warning")
            setIsLoggedIn(false);
          } else if (response.status === 200) {
            setMesssage("Log in successful");
            setAlertColour("primary")
            localStorage.setItem("bearerToken", data.bearerToken.token);
            localStorage.setItem("refreshToken", data.refreshToken.token);
            localStorage.setItem("email", email);
            setIsLoggedIn(true);
          } else {
            throw new Error(`Request failed with status code ${response.status}`);
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }

        if (isLoading) {
            return <p>Logging in... ...</p>;
        }
    
        if (error) {
            return <p>Error: {error}</p>;
        }
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
                    <h3>Login</h3>
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
                </CardBody>
                <CardBody style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button 
                        color={buttonColour} 
                        disabled={buttonColour === 'danger'}
                        onClick={() => {LoginAPI(); toggleAlert();}}
                    >
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login;