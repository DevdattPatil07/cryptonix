import { Box, Button, TextField } from '@material-ui/core'
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { API_URL } from '../constant';
import { useUser } from '../Context/User';
var bcrypt = require('bcryptjs');

const SignUpForm = ({handleClose}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [ConfirmPassword,setConfirmPassword] = useState("");

    const {setUser} = useUser();

    const handleKeyPress = (e)=>{
        if(e.key==="Enter"){
            handleSubmit();
        }
    }

    const handleSubmit = async()=>{
        if(password!==ConfirmPassword){
            window.alert("Password does not match");
            return;
        }

        var hashedPassword = bcrypt.hashSync(password, 10);

        const {data} = await axios.get(`${API_URL}/user?email=${email}`);
        if(data.length>0){
            window.alert("User already exist; Please log in.");
        }else{
            const response = await axios.post(`${API_URL}/user`,
            {
                "id":Date.now(),
                "email":email,
                "hashedPassword":hashedPassword
            }
            );
            const {data} = await axios.get(`${API_URL}/user?email=${email}`);
            if(response){
                window.alert("Signup successfull");
                setUser(data[0]);
                handleClose();
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
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>
        <TextField
        variant='outlined'
        type='password'
        label='Enter Password'
        onChange={(e)=>setPassword(e.target.value)}
        >

        </TextField>
        <TextField
        variant='outlined'
        type='password'
        label='Confirm Password'
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >

        </TextField>
        <Button variant='contained'
        size='large'
        onClick={handleSubmit}
        style={{
            backgroundColor:'blue',
            borderRadius:'10px',
            color:'white'
        }}>
            Sign Up
        </Button>
    </Box>
  )
}

export default SignUpForm