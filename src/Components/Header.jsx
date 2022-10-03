import { AppBar, Button, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useUser } from '../Context/User'
import LoginButton from './LoginButton'

const useStyles = makeStyles(()=>({
    container:{
        display:"flex",
        padding:15,
    },
    title:{
        flex:1,
        fontWeight:'bold'
    }
}))

const Header = () => {

    const classes = useStyles();

    const {user,setUser} = useUser();

    const handleLogOut = ()=>{
        setUser();
    }

  return (
    <div>
        <AppBar color="transparent" position="static">
            <Container className={classes.container}>
                <Typography variant='h6' className={classes.title}>
                    Cryptonix
                </Typography>
                {user?(
                    <>
                        <Typography variant='h7' style={{margin:10}}>Welcome {user.email}</Typography>
                        <Button
                            variant="contained"
                            style={{width:80,height:40,backgroundColor:'red',color:'white'}}
                            onClick={handleLogOut}>
                            LogOut
                        </Button>
            </>
                ):<LoginButton/>}                
            </Container>
        </AppBar>
    </div>
  )
}

export default Header