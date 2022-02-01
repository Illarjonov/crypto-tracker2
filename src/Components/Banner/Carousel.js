import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core";
import axios from "axios";
import {TrendingCoins} from "../../config/api";
import {CryptoState} from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";



const useStyle = makeStyles((theme)=>({
    carousel:{
        height: "50%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem:{
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        cursor: "pointer",
        textTransform:"uppercase",
        color: "white",
    }
    })
)
//52233 => 52,233 steal from the internet
export function numberWithCommas (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const classes = useStyle();
//top coins
    const [trending, setTrending] = useState([])

    const { currency, symbol } = CryptoState();
    //get context currency

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins( currency ))
        setTrending(data)
    }

    useEffect(()=>{
        fetchTrendingCoins()
    },[currency])
//
    const items =  trending.map(coin=>{
        let profit = coin.price_change_percentage_24h >= 0;
        return<a
            href={'/coins/${coin.id'}
            className={classes.carouselItem}>
            <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom: 10}}/>
            <span>
                    {coin?.symbol}
                &nbsp;
                     <span
                         style={{
                            color: profit > 0 ? "rgb(14, 203, 129)": "red",
                             fontWeight: 500,
                         }}>
                        {profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>

            <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol} {numberWithCommas(coin ?.current_price.toFixed(2) ) }
                </span>
        </a>
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    return(
        <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            animationDuration={1500}
            autoPlayInterval={1000}
            disableDotsControls
            disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}/>
        </div>
    )
}
export default Carousel;