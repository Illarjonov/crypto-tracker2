import React, { useState, useEffect} from 'react';
import axios from "axios";
import {CoinList} from "../../config/api";
import {CryptoState} from "../../CryptoContext";
import Loader from '../UI/loader/loader'
import {createTheme,
        TextField,
        ThemeProvider,
        Container,
        Typography,
        Toolbar,
        TableHead,
        Table,
        TableContainer} from "@material-ui/core";
import Coin from './Coin'
import TableHeader from "./TableHeader";



const CoinsTable = () => {

const [coins, setCoins] = useState([])
const [loading, setLoading] = useState([])
const [search, setSearch] = useState([])

    const {currency, symbol} = CryptoState();

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

                <TextField
                    label="Поиск интересующей криптовалюты.."
                    variant="outlined"
                    style = {{marginBottom:20, width: "100%"}}
                    onChange={(e)=> setSearch(e.target.value)}
                />
    <TableContainer>
       {loading ? <Loader/>
                : ( <div>
                    <TableHeader/>
                    {coins.map(coin => {
                        return (
                        <Coin key={coin.id}
                              name = {coin.name}
                              price ={coin.current_price}
                              image={coin.image}
                              symbol={symbol}
                              symbolCoin={coin.symbol}
                              marketcap={coin.market_cap}
                              priceChange = {coin.price_change_percentage_24h}
                              volume={coin.total_volume} />
                    )
                        })
                    }
                    </div>
           )
                }
    </TableContainer>

            </Container>
        </ThemeProvider>
    )
}
export default CoinsTable;