import React, {useState,useEffect} from 'react'
import {HistoricalChart} from '../../config/api';
import axios from 'axios';
import {CryptoState} from "../../CryptoContext";
import { chartDays } from "../../config/data";
import SelectButton from "./SelectButton";
import {
    createTheme,
    makeStyles,
    ThemeProvider } from "@material-ui/core";
import Loader from "../UI/loader/loader";
import { Line } from "react-chartjs-2";



const CoinInfo = ( {coin} ) => {
    const { currency } = CryptoState();
    const [historicalData,setHistoricalData] = useState();
    const [days,setDays] = useState(1);
    const [flag,setFlag] = useState(false);

    const useStyles = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));
        const classes = useStyles();


    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days ,currency))
        setFlag(true);
        setHistoricalData( data.prices )
    };

    useEffect(()=>{
        fetchHistoricData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[days])

    //чтобы отрабатывало только при изменении дня



    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {!historicalData | flag===false
                    ? (<Loader/>)
                    : (  <>{ console.log(historicalData)}
                            <Line options={{
                                elements: {
                                        point: {
                                            radius: 1,
                                            },
                                        },
                                 }}
                                  data = {{
                                      labels: historicalData.map((coin) => {
                                          let date = new Date(coin[0]);
                                          let time =
                                              date.getHours() > 12
                                                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                  : `${date.getHours()}:${date.getMinutes()} AM`;
                                          return days === 1 ? time : date.toLocaleDateString();
                                      }),
                                      datasets: [
                                          {
                                              data: historicalData.map((coin) => coin[1]),
                                              label: `Price ( Past ${days} Days ) in ${currency}`,
                                              borderColor: "#EEBC1D",
                                          },
                                      ],
                                  }}
                                 />

                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 20,
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}
                            >
                                {chartDays.map((day) => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => {setDays(day.value);
                                            setFlag(false);
                                        }}
                                        selected={day.value === days}
                                    >       {day.label}      </SelectButton>
                                ))}
                            </div>
                         </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}
export default  CoinInfo;