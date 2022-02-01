import React from 'react';
import './Coin.css'
import {Container,TableHead} from "@material-ui/core";

const TableHeader = () => {

    return(
<Container
    style={{backgroundColor: "#2E3236",
            borderRadius: "8px"}}>

        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <p>Crypto </p>
                    <h1>Name</h1>
                    <p className="coin-symbol"> Symbol </p>
                </div>
                <div className="coin-data">
                    <p className="coin-price"> Price </p>
                    <p className="coin-volume1"> Volume </p>
                    <p className="coin-percent"> Price Change</p>
                    <p className="coin-marketcap">Mkt Cap:</p>
                </div>
            </div>
        </div>

</Container>
    )
}
export  default TableHeader;
