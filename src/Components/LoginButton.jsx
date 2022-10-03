import { AppBar, Button, makeStyles, Modal, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const useStyle = makeStyles(()=>({
    modal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    box:{
        width:400,
        backgroundColor:'grey',
        color:'white',
        borderRadius:10
    }
}))

const LoginButton = () => {

    const [open,setOpen] = useState(false);
    const [value,setValue] = useState(0);

    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false)
    }
    const handleChange = (event,v)=>{
        setValue(v);
    }
    const classes = useStyle();

  return (
    <div>
        <Button
        variant="contained"
        style={{width:80,height:40,backgroundColor:'red',color:'white'}}
        onClick={handleOpen}>
            Login
        </Button>
        <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        closeAfterTransition
        open={open}
        onClose={handleClose}
        className={classes.modal}>
            <div className={classes.box}>
                <AppBar position='static'
                style={{backgroundColor:'transparent',color:'white',borderRadius:10}}>
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='fullWidth'>
                        <Tab label='login'/>
                        <Tab label='sign up'/>
                    </Tabs>
                </AppBar>
                {value===0 && <LoginForm handleClose={handleClose}/>}
                {value===1 && <SignUpForm handleClose={handleClose}/>}

            </div>
        </Modal>
    </div>
  )
}

export default LoginButton