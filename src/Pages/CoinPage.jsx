import {useParams} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {CryptoState} from '../CryptoContext';
import {SingleCoin} from '../config/api';
import axios from "axios";
import {makeStyles,} from "@material-ui/core";
import CoinInfo from "../Components/Banner/CoinInfo";
import {Typography} from "@material-ui/core";
import Loader from "../Components/UI/loader/loader";


const CoinPage = () => {

const {id} = useParams();
//если хочешь углубляться дальше одной позиции, не передавай в юсСтейт дефолтный объект
//главное при вызове использовать coin?.image.large
//в ином случае минимального углубления можно
const [coin, setCoin] = useState();
const { currency, symbol } = CryptoState();

//в проекте надо добавить промисы

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setCoin(data)
    };


    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   // console.log(coin)
const useStyles = makeStyles((theme)=>({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]:{
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "25",
            borderRight: "2px solid grey"
        },
        heading:{
            fontWeight:"bold",
            marginBottom: "20",
            fontFamily: "Montserrat"
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }))
const classes = useStyles();

if (!coin) return <Loader/>
    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}/>

                <Typography variant="h3" className={classes.heading}>
                    {coin?.name}
                </Typography>

                &nbsp;&nbsp;&nbsp;
                <Typography variant="subtitle1">
                    <a href={coin?.links.blockchain_site[0]}> { (coin?.links.blockchain_site[0]) } </a>
                </Typography>

            &nbsp;&nbsp;&nbsp;
            <div className={classes.marketData}>
                <span style = {{display: "flex"}}>
                    <Typography variant="h5" classes={classes.heading}>
                        RANK: &nbsp; {coin?.market_cap_rank}
                    </Typography>
                </span>
        &nbsp;&nbsp;
                <span style = {{display: "flex"}}>
                    <Typography variant="h5" classes={classes.heading}>
                        Current Price: &nbsp;
                    </Typography>
        &nbsp;&nbsp;
                    <Typography variant="h5" style={{fontFamily: "Montserrat",}}>
                        {symbol}{" "}
                        { coin?.market_data.current_price[currency.toLowerCase()]
                                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                    </Typography>
                </span>
        &nbsp;&nbsp;
                <span style = {{display: "flex"}}>
                    <Typography variant="h5" classes={classes.heading}>
                        Market Cap: &nbsp;
                    </Typography>
        &nbsp;&nbsp;
                    <Typography variant="h5" style={{fontFamily: "Montserrat",}}>
                        {symbol}{" "}
                        { coin?.market_data.market_cap[currency.toLowerCase()]
                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        }
                    </Typography>
                </span>
            </div>
        </div>
            <CoinInfo coin={coin} />
    </div>
    )
}
 export default CoinPage;
// {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
//найти парсер и добавить в описание