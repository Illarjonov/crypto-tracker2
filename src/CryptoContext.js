import React from 'react';
import {createContext, useContext, useState, useEffect} from "react";
import axios from "axios";
import {CoinList} from "./config/api";

const Crypto = createContext();

//change select currency
const CryptoContext = ({children}) => {
//obj, func
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [coins,setCoins] = useState([]);
    const [loading,setLoading]= useState(false);
    const [user,setUser] = useState(null);
    const [alert,setAlert] = useState({
                                open: "false",
                                message: "",
                                type: "success",
                             });

    const fetchCoins = async () =>{
        setLoading(true);

        const {data} = await axios.get( CoinList( currency ) );
        setCoins(data);

        setLoading(false);
    };

    useEffect( ()=>{
            if (currency === "USD") setSymbol ("$")
            else if (currency === "RUB") setSymbol ("₽")
    },[currency]);

    return  <Crypto.Provider
                value = {{  currency,
                            symbol,
                            setCurrency,
                            loading,
                            coins,
                            fetchCoins
                        }}
            > {children} </Crypto.Provider>

}
export default CryptoContext;

export const CryptoState = () => {
        return  useContext(Crypto)
             };