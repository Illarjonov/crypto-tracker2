import React, {useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {CryptoState} from "../../CryptoContext";

const Alert = () => {
    const {alert,setAlert}= CryptoState();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <Snackbar>

        </Snackbar>
    )
}