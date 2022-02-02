import React from 'react';
import {makeStyles,Container, Typography} from "@material-ui/core";
import Carousel from "./Carousel";


const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: "url(./banner2.jpg)"
    },
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline:{
        display: "flex",
        height:"40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
    })
)

const Banner = () => {
    const classes = useStyles();

    return(
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant= "h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat"
                        }}
                    > Crypto Tracker v2
                    </Typography>

                    <Typography
                        variant= "subtitle2"
                        style={{
                            color: "darkgrey",

                            fontFamily: "Montserrat"
                        }}
                    > Pet-project, деланный с подобия проекта какого-то индуса, верстка взята подчистую и реализована с помощью materialUI
                    </Typography>
                    <Typography
                        variant= "subtitle2"
                        style={{
                            color: "darkgrey",
                            fontFamily: "Montserrat"
                        }}
                    > Реализовано на HOOKах, api взят с marketCap, проект делался для отточения AJAX запросов и HOOKов
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}
export default Banner;