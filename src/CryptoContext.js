import React from 'react';
import {createContext, useContext, useState, useEffect} from "react";

const Crypto = createContext();

//change select currency
const CryptoContext = ({children}) => {
//obj, func
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")

    useEffect( ()=>{
        if (currency === "USD") setSymbol ("$")
        else if (currency === "RUB") setSymbol ("₽")
    },[currency]);

    return <Crypto.Provider value={{currency, symbol, setCurrency}}> {children} </Crypto.Provider>

}
export default CryptoContext;

export const CryptoState = () => {
   return  useContext(Crypto)
};