import React, { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {CryptoState} from "../../CryptoContext";
import Loader from '../UI/loader/loader'
import {
    createTheme,
    TextField,
    ThemeProvider,
    Container,
    Typography,
    TableRow,
    TableHead,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    makeStyles} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {numberWithCommas} from "../Banner/Carousel";



const CoinsTable = () => {

const [search, setSearch] = useState('');
const [page,setPage] = useState(1);
const navigate = useNavigate();
const {currency, symbol, coins, loading, fetchCoins} = CryptoState();

//при новой отрисовке по курсу брать новый запрос с сервера
    useEffect(()=>{
        fetchCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            type: "dark",
        },
    })
//toLowerCase- строку в строчные нижнего реестра
//includes- пределяет содержит ли массив искомый эллемент, на выходе бул. В индексОф на выходе индекс
    const handlerSearch= () => {
        return coins.filter(
                    (coin)=>(
                        coin.name.toLowerCase().includes(search.toLowerCase()) ||
                        coin.symbol.toLowerCase().includes(search.toLowerCase())
        ))
    }

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
        },
    });
    const classes= useStyles();
    return (
        <ThemeProvider  theme = {darkTheme}>
            <Container style = {{textAlign: "center"}}>
                <Typography
                    variant='h4'
                    style = {{margin: 18, fontFamily: "Montserrat"}}
                >Курс криптовалют от Market Cap </Typography>

                <TextField
                    label="Поиск интересующей криптовалюты.."
                    variant="outlined"
                    style = {{marginBottom:20, width: "100%"}}
                    onChange={(e)=> setSearch(e.target.value) }
                />

    <TableContainer>
       {loading ? <Loader/>
                : ( <Table aria-label="simple table">
                        <TableHead style={{backgroundColor: "#EEBC1D"}}>
                            <TableRow>
                                { ["Coin", "Price", "24h Change", "Market Cap"]
                                    .map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >{head}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handlerSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row)=>{
                            const profit = row.price_change_percentage_24h > 0;

                            return(
                                <TableRow
                                    onClick={()=> navigate(`/coins/${row.id}`)}
                                    className= {classes.row}
                                    key={row.name}>
                                        <TableCell
                                            component='th'
                                            scope="row"
                                            styles={{
                                                display: "flex",
                                                gap: 15,
                                            }}>
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{marginBottom: 10}}
                                                />

                                                <div style={{
                                                        display:"flex",
                                                        flexDirection:"column"}}>

                                                    <span style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,}}
                                                        > {row.symbol} </span>

                                                    <span style={{color: "darkgrey"}}
                                                        >{row.name}</span>
                                                </div>
                                        </TableCell>

                                        <TableCell align="right">
                                            {symbol}{""}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell
                                            align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}>
                                            {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(
                                                row.market_cap.toString())}
                                        </TableCell>
                                </TableRow>
                            )
                            }) }
                        </TableBody>
                    </Table>
           )}
    </TableContainer>

                <Pagination
                    count={(handlerSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: "20",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={( _ , value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />

            </Container>
        </ThemeProvider>
                )
        }

export default CoinsTable;

// {coins.map(coin => {
//     return (
//         <Coin key={coin.id}
//               name = {coin.name}
//               price ={coin.current_price}
//               image={coin.image}
//               symbol={symbol}
//               symbolCoin={coin.symbol}
//               marketcap={coin.market_cap}
//               priceChange = {coin.price_change_percentage_24h}
//               volume={coin.total_volume} />
//     )
// })
// }