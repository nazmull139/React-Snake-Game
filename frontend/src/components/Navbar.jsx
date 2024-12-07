import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetHighScoreQuery, useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {

   {/* const [password , setPassword] = useState();
    const [name , setName] = useState();
    const [email , setEmail] = useState();
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem("high-score")) || 0
      );*/}

      const {user} = useSelector((state)=>state.auth);
      const {data} = useGetHighScoreQuery(user._id);


  {/*  useEffect(() => {
        
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse the JSON string into an object
        }
        
      }, []);

      useEffect(() => {
        if (user) {
          setPassword(user.isPassword);
          setName(user.username);
          setEmail(user.email);
          setHighScore(user.highScore)
        }
      }, [user]); */}

      
   {/*   useEffect(() => {
        console.log("User:", user);
        console.log("Data:", data);
    }, [user, data]);*/}
    

 const [logoutUser] = useLogoutUserMutation();
 const dispatch = useDispatch();

    const handleLogOut = async ()=>{
       
        try {
          await logoutUser().unwrap();
          dispatch(logout());
          alert("Logged out successfully");
          localStorage.clear();
          window.location.reload();
          navigate('/login')
        } catch (error) {
          console.error("Failed to logout",error)
        }
         }


         //const [highScore, setHighScore] = useState(user?.highScore)
    //     const [updateHighScore] = useUpdateHighScoreMutation();
     
       {/*   const handleUpdateScore = async () => {
             try {
                 console.log(highScore)
     
                 await updateHighScore({ userId: user?._id, highScore }).unwrap();
                 alert("User role updated successfully!");
                
             } catch (error) {
                 console.error("Failed to update user role", error);
             }
         }

*/} 


  return (
    <div className='my-7 flex justify-between items-center'>  

        <div className='flex flex-col'>
           <span className='bg-black text-yellow-50 p-2 w-[150px] text-center mb-2'>{user.username}</span> 
           <span className='bg-teal-600 text-black p-2 w-[150px] text-center'>High Score : {data?.user?.highScore}</span> 
        </div>
        <div>
          <button onClick={handleLogOut} className='dropdown-items bg-yellow-400 text-black p-2 font-semibold hover:bg-orange-600 transition-all duration-300'>Logout</button>
        </div>
       
        
    </div>
  )
}

export default Navbar