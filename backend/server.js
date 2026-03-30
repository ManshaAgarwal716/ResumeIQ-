const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()
app.use(cors())
const resumeroutes=require("./src/routes/resumeroute")
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err)=>console.log(err))
app.use("/api/resume",resumeroutes)
app.get("/",(req,res)=>{
     res.json({ message: "Resume Roaster API running" });
})
app.post("/test", (req, res) => {
  res.json({ message: "POST works fine" });
});
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
