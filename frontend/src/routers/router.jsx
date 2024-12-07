
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/home/Home";






const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
    ]
    },

    {
      path:"/login",
      element:<Login/>
    },

    {
      path:"/register",
      element:<Register/>
    },
    {
      path: "/dashboard", // parents
      element:<div></div> ,
    },


])

export default router ;