import  express  from "express";
import bodyParser from "body-parser";
import  cors  from "cors";
import  dotenv  from "dotenv";
import  helmet  from "helmet";
import morgan from "morgan";
import path from "path";
import  { fileURLToPath }  from "url";
import './config/db.js';
import  authRoutes  from './routes/auth.js'
import  usersRoutes  from './routes/users.js'
import  hotelsRoutes  from './routes/hotels.js'
import  roomsRoutes  from './routes/rooms.js'
import cookieParser from 'cookie-parser'
// configuration 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const PORT = process.env.SERVER_PORT || 5000 ;
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))
app.use(cookieParser())

// middlewares 
app.use("/api/auth",authRoutes);
app.use("/api/user",usersRoutes);
app.use("/api/hotels",hotelsRoutes);
app.use("/api/room",roomsRoutes);

//error handling middleware
app.use((err, req, res, next)=>{
    const errStatus = err.status || 500 ;
    const errMessage = err.message || "something went wrong" ;

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    });
})

// Routes 
app.get("/",(req,res) => {
    res.status(200).send("Api Running")
})

app.listen(PORT,() => {
    console.log(`server started on port ${PORT}`)
})