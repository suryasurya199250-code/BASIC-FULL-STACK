
import {useEffect,useState} from "react";
import axios from "axios";

export default function Dashboard(){

const token=localStorage.getItem("token");

const [foods,setFoods]=useState([]);
const [editingId,setEditingId]=useState(null);

const [form,setForm]=useState({
name:"",
description:""
});

const config={
headers:{
Authorization:`Bearer ${token}`
}
};

const fetchFoods=async()=>{
try{
const res=await axios.get("http://localhost:5000/api/products",config);
setFoods(res.data);
}catch(err){
console.log(err);
}
};

useEffect(()=>{
fetchFoods();
},[]);

const submit=async(e)=>{
e.preventDefault();

try{
if(editingId){
await axios.put(`http://localhost:5000/api/products/${editingId}`,form,config);
setEditingId(null);
}else{
await axios.post("http://localhost:5000/api/products",form,config);
}

setForm({
name:"",
description:""
});

fetchFoods();
}catch(err){
console.log(err);
}
};

const editFood=(food)=>{
setEditingId(food._id);

setForm({
name:food.name,
description:food.description
});
};

const deleteFood=async(id)=>{
try{
await axios.delete(`http://localhost:5000/api/products/${id}`,config);
fetchFoods();
}catch(err){
console.log(err);
}
};

const logout=()=>{
localStorage.removeItem("token");
window.location.href="/";
};

return(
<div className="dashboard">

<div className="topbar">
<h1>Food Waste Dashboard</h1>
<button onClick={logout}>Logout</button>
</div>

<div className="grid">

<div className="form-card">
<h2>{editingId ? "Edit Food" : "Add Food"}</h2>

<form onSubmit={submit}>

<input
type="text"
placeholder="Food Name"
value={form.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
/>

<textarea
placeholder="Description"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

<button type="submit">
{editingId ? "Update Food" : "Add Food"}
</button>

</form>
</div>

<div className="list-card">
<h2>Available Food</h2>

{foods.map((food)=>(
<div className="food-item" key={food._id}>

<h3>{food.name}</h3>
<p>{food.description}</p>

<div className="action-row">
<button className="edit-btn" onClick={()=>editFood(food)}>
Edit
</button>

<button className="delete-btn" onClick={()=>deleteFood(food._id)}>
Delete
</button>
</div>

</div>
))}

</div>

</div>

</div>
);
}
