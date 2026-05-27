
import {useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

export default function Login(){
const navigate=useNavigate();

const [form,setForm]=useState({
email:"",
password:""
});

const submit=async(e)=>{
e.preventDefault();

try{
const res=await axios.post("http://localhost:5000/api/auth/login",form);
localStorage.setItem("token",res.data.token);
navigate("/dashboard");
}catch(err){
alert(err.response?.data?.message || "Login Failed");
}
};

return(
<div className="auth-container">
<form className="auth-card" onSubmit={submit}>
<h2>Food Waste Prevention</h2>

<input
type="email"
placeholder="Email"
onChange={(e)=>setForm({...form,email:e.target.value})}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setForm({...form,password:e.target.value})}
/>

<button type="submit">Login</button>

<div className="link">
<Link to="/register">Create Account</Link>
</div>
</form>
</div>
);
}
