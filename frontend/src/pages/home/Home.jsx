import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';
import SnakeGame from './SnakeGame';

const Home = () => {
    const [user, setUser] = useState(null);
    const [password , setPassword] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse the JSON string into an object
        }
        
      }, []);

      useEffect(() => {
        if (user) {
          setPassword(user.isPassword);
        }
      }, [user]);

    //  console.log(user)
    
      
  return (
    <div>
        
        {password ? <SnakeGame/> : <Login/> }
        
    </div>
  )
}

export default Home