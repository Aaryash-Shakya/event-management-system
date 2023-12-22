import express from 'express'
const app = express();
import cors from 'cors';

app.use(cors());
app.use(express.json());

app.listen(8000,()=>{
    console.log('server started at port: 8000');
})
