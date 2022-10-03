import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const useStyles = makeStyles(()=>({
    items:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    }
}))

const Carousel = () => {

    const [tenCoin,setTenCoin] = useState([]);

    const callAPI = async()=>{
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=10');
        setTenCoin(data);
    }

    useEffect(()=>{
        callAPI()
    },[]);

    const classes = useStyles();

    const items = tenCoin?.map((coin)=>{
        return(
            <div className={classes.items}>
                <img src={coin?.image}
                height='80'
                alt=''
                style={{
                marginBottom:10
                }}/>
                <span style={{ textTransform: "uppercase", fontSize: 18 }}>{coin.symbol}</span>
                <span style={{ color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>
                    {coin.price_change_percentage_24h}%
                </span>
            </div>
        )
    })

    const responsive = {
        0:{
            items: 2,
        },
        512: {
            items: 4
        }
    }

  return (
    <div>
        <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay={true}
        items={items}/>
    </div>
  )
}

export default Carousel