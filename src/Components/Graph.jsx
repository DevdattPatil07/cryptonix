import { CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { Chart as Chartjs,CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

Chartjs.register(
    Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement
)

const useStyle = makeStyles(()=>({
    container:{
        width:"auto",
        marginTop: 25,
        padding: 40,
        display:"flex",
        // flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
    }
}))

const Graph = ({id}) => {

    const [graphData,setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async()=>{
        const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=30`);
        setGraphData(data.prices);
        setLoading(false);
    }

    const classes = useStyle();

    useEffect(()=>{
        getData();
    },[]);

  return (
    <div className={classes.container}>
        {!loading?(
            <Line
            data = {{
                labels:graphData?.map((i)=>{
                    let date = new Date(i[0]);
                    return date.toLocaleDateString();
                }),
                datasets:[
                    {
                        data:graphData?.map((i)=>i[1]),
                        label:"Prices",
                        borderColor:"gold"
                    }
                ]
            }}
            />
        ):(<CircularProgress style={{color:"gold"}} size={250} thickness={1}/>)}
    </div>
  )
}

export default Graph