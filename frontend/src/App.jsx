
import {Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Protected({children}){
const token=localStorage.getItem("token");
return token ? children : <Navigate to="/"/>;
}

export default function App(){
return(
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
</Routes>
);
}
