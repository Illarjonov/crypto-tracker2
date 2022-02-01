import React, { useState, useEffect} from 'react';
import axios from "axios";
import {CoinList} from "../../config/api";
import {CryptoState} from "../../CryptoContext";
import {createTheme, ThemeProvider, Container, Typography, Toolbar} from "@material-ui/core";
import Coin from './Coin'
const CoinsTable = () => {

const [coins, setCoins] = useState([])
const [loading, setLoading] = useState([])

    const {currency} = CryptoState();

    const fetchCoins = async () =>{
        setLoading(true)

        const {data} = await axios.get(CoinList(currency));



        setCoins(data);
        setLoading(false);
}
//при новой отрисовке по курсу брать новый запрос с сервера
    useEffect(()=>{
        fetchCoins()
    },[currency])

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            type: "dark",
        },
    })
    console.log(coins);
    return (
        <ThemeProvider  theme = {darkTheme}>
            <Container style = {{textAlign: "center"}}>
                <Typography
                    variant='h4'
                    style = {{margin: 18, fontFamily: "Montserrat"}}
                >Курс криптовалют от Market Cap
                </Typography>
                { coins.map(coin => {
                    return (
                        <Coin key={coin.id}
                              name = {coin.name}
                              price ={coin.current_price}
                              image={coin.image}
                              symbol={coin.symbol}
                              marketcap={coin.market_cap}
                              priceChange = {coin.price_change_percentage_24h}
                              volume={coin.total_volume}
                        />
                    )
                })
                }
            </Container>
        </ThemeProvider>
    )
}
export default CoinsTable;