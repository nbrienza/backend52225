import express from "express"
const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.listen(PORT, ()=>{console.log(`App listening on port http://localhost:${PORT}`);})
app.use(express.urlencoded({
    extended: true
}));
app.get ("/kepio", (req, res)=>{
    return res.json({kepio:"awper"})
})