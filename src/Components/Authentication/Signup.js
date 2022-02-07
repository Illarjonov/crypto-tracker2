import React, {useState} from 'react'
import {Box, TextField, Button} from "@material-ui/core";
import {CryptoState} from "../../CryptoContext";
import {auth} from "../../firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({handleClose}) => {
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const {setAlert} = CryptoState();

    const handleSubmit = async () => {
        if (password !== confirmPassword){
            setAlert({
                open: true,
                message: "Пароли не совпадают",
                type: "error"
            })
        }
        try{
            const results = await createUserWithEmailAndPassword(
                auth,
                email,
                password);

            console.log(results);

            setAlert({
                open: true,
                message: `Регистрация прошла успешно. Добро пожаловать, ${results.user.email}`,
                type: "success",
            });

            handleClose()
        } catch(error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error"
            });
            return;
        }
    };


    return(
       <Box
            p={3}
            style={{display:"flex", flexDirection:"column", gap: "20px"}}
       >
            <TextField
                variant = "outlined"
                type = "email"
                label = "Enter Email"
                value = {email}
                onChange={(e)=>setEmail(e.target.value)}
                fullWidth
            />
           <TextField
               variant="outlined"
               label="Enter Password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               fullWidth
           />
           <TextField
               variant="outlined"
               label="Confirm Password"
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               fullWidth
           />
           <Button
               variant="contained"
               size="large"
               style={{ backgroundColor: "#EEBC1D" }}
               onClick={handleSubmit}
           > Sign Up  </Button>
       </Box>
    )
};
export default Signup;