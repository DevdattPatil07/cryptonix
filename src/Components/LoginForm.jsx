import { Box, Button, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../constant';
import { useUser } from '../Context/User';
var bcrypt = require('bcryptjs');


const LoginForm = ({handleClose}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const {setUser} = useUser();

    const handleKeyPress = (e)=>{
        if(e.key==="Enter"){
            handleSubmit();
        }
    }

    const handleSubmit =async()=>{
        if(!email || !password){
            window.alert("Please enter credentials");
            return
        }
        console.log(process.env.PORT);

        const {data} = await axios.get(`${API_URL}/user?email=${email}`);
        if(data.length===0){
            window.alert("User does not exist; Please sign up.");
            return
        }
        else{
            if(bcrypt.compareSync(password,data[0].hashedPassword)){
                window.alert("User logged in");
                setUser(data[0]);
                handleClose();
            } else{
                window.alert("Incorrect Password");
            }
        }
    }
  return (
    <Box p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'white',
        borderBottomLeftRadius:'10px',
        borderBottomRightRadius:'10px'
    }}
    onKeyDown={handleKeyPress}>
        <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        style={{marginTop:10}}
        onChange={(e)=>setEmail(e.target.value)}>

        </TextField>
        <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        onChange={(e)=>setPassword(e.target.value)}>

        </TextField>
        <Button variant='contained'
        size='large'
        style={{
            backgroundColor:'blue',
            borderRadius:'10px',
            color:'white'
        }}
        onClick={handleSubmit}>
            Login
        </Button>
    </Box>
  )
}

export default LoginForm