import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Alert } from 'reactstrap';

function Notification({ message, visible, alertColour }) {

    return (
        <Alert color={alertColour} isOpen={visible}>
            {message}
        </Alert>
    )
}

export default Notification;