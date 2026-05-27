
import {useState} from "react";
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";

export default function Register(){

const navigate=useNavigate();

const [form,setForm]=useState({
name:"",
email:"",
password:""
});

const submit=async(e)=>{
e.preventDefault();

try{
await axios.post("http://localhost:5000/api/auth/register",form);
navigate("/");
}catch(err){
alert(err.response?.data?.message || "Register Failed");
}
};

return(
<div className="auth-container">
<form className="auth-card" onSubmit={submit}>
<h2>Create Account</h2>

<input
type="text"
placeholder="Name"
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

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

<button type="submit">Register</button>

<div className="link">
<Link to="/">Back To Login</Link>
</div>
</form>
</div>
);
}
