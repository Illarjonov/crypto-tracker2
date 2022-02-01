import react from 'react';
import './Coin.css'

const Coin = ({name, image, symbol, price, volume, priceChange, marketcap, symbolCoin}) => {
    return(

        <div className="coin-container">
            <div className="coin-row">
                <a className="coin"
                   href={`/coins/${symbolCoin}`}>
                    <img src={image} alt="crypto"/>
                    <h1>{name}</h1>
                    <p className="coin-symbol"> {symbolCoin} </p>
                </a>
                <div className="coin-data">
                    <p className="coin-price"> {symbol} {price.toLocaleString()}</p>
                    <p className="coin-volume"> {symbol} {volume.toLocaleString()} </p>
                    {priceChange < 0 ? (
                        <p className="coin-percent red">
                            {priceChange.toFixed(2)}%</p>
                    ): ( <p className="coin-percent green">
                        {priceChange.toFixed(2)}%</p>)
                    }
                    <p className="coin-marketcap">
                        Mkt Cap: {symbol} {marketcap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>

    )
}
export  default Coin;
