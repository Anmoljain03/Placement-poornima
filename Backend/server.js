import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

// api endpoints
app.get('/', (req, res) => {
   res.send("API running great")
})

app.listen(PORT, () => console.log("Server Started", PORT) )