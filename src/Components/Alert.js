import {CryptoState} from "../CryptoContext";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React, {useState} from "react";

const Alert = () =>{
    const {alert, setAlert} = CryptoState();
    const [open, setOpen] = useState(false);


    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlert({ open: false });
    };


    return (
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleCloseAlert}>
            <MuiAlert
                onClose={handleCloseAlert}
                variant="filled"
                elevation={10}
                severity={alert.type}
            > {alert.message} </MuiAlert>
        </Snackbar>
    )
};
export default Alert;