import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage:"url(./Banner.jpg)"
    },
    content:{
        height:400,
        paddingTop:20,
        justifyContent:"space-around",
        display:"flex",
        flexDirection:"column"
    },
    heading:{
        textAlign:"center",        
        fontWeight:"bold",
        
    }
}))

const Banner = () => {

    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.content}>
            <div>
                <Typography variant="h2" className={classes.heading}>
                    Cryptonix
                </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner