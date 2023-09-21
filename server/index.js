import  express  from "express";
import bodyParser from "body-parser";
import  cors  from "cors";
import  dotenv  from "dotenv";
import  helmet  from "helmet";
import morgan from "morgan";
import path from "path";
import  {fileURLToPath}  from "url";

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

// Routes 
// app.use("/auth",authRoutes)

app.listen(PORT,() => {
    console.log(`server started on port ${PORT}`)
})