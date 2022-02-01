import {useParams} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {CryptoState} from '../CryptoContext';
import {SingleCoin} from '../config/api';
import axios from "axios";
//import ReactHtmlParser from '';
import {makeStyles} from "@material-ui/core";
import CoinInfo from "../Components/Banner/CoinInfo";
import {Typography} from "@material-ui/core";

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

    console.log(coin)

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
        }
    }))

const classes = useStyles();

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
                { (coin?.description.en) }.
                /*просто добавь и без лишних вопросов*/
                <Typography variant="subtitle1" className={classes.description}>

                </Typography>
            </div>

            {/*chart*/}
            <CoinInfo coin={coin}/>
        </div>
    )
}
 export default CoinPage;