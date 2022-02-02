import React from 'react';
import {useNavigate} from 'react-router-dom'
import {
    ThemeProvider,
    AppBar,
    Container,
    Toolbar,
    Typography,
    MenuItem,
    Select,
    makeStyles,
    createTheme} from "@material-ui/core";
import {CryptoState} from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";

const useStyles = makeStyles(()=>({
    title:{
        flex: 1,
        color: "gold",
        fontFamily:"Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }
}));

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate(); //back to homepage

    const {currency, setCurrency} = CryptoState();

    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            text:{
                primary: "#fff"
            }
        },
    });

    console.log(currency)
    return(
     <ThemeProvider theme={darkTheme}>
        <AppBar color = "transparent" position='static'>
            <Container>
                <Toolbar>

                    <Typography
                        onClick={()=> navigate('/')}
                        className={classes.title}
                        variant='h5'
                    >Crypto Tracker v2</Typography>

                    <Select /*выбираем валюту и она меняется через useContext */
                        value={currency}
                        onChange={e => setCurrency(e.target.value)}
                        variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginLeft: 15,
                        }}>
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"RUB"}>RUB</MenuItem>
                    </Select>

                    <AuthModal/>
                </Toolbar>
            </Container>
        </AppBar>
     </ThemeProvider>
    )
}
 export  default  Header;