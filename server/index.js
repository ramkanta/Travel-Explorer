import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3005;
app.use(express.static('public')); // Assuming your static files are in the 'public' folder

// Example in Express



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your static files are in the 'public' folder




mongoose.connect("mongodb://0.0.0.0:27017/Travelmessage",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connection sucessfully");
}).catch((error)=>{
    console.log(error);

})



const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userschema);

app.post("/contact", async(req,res) =>{
    try {
        // res.send(req.body);
        const Userdata = new User(req.body);
        await Userdata.save();
        // res.status(201).render("success");
        res.send("Successfully Send Message");
        
    } catch (error) {
        res.status(500).send(error);
        
    }
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ... (rest of your code)

app.get("/", (req, res) => {
    // Handle the GET request for /contact
    const contactFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(contactFilePath);
});



app.use('/assets', express.static('public')); // Assuming your CSS files are in the 'public/assets/css' folder

// Example route handler for serving CSS
app.get('/assets/css/style.css', (req, res) => {
    res.type('text/css');
    res.sendFile(path.join(__dirname, 'public', 'assets', 'css', 'style.css'));
});


app.listen(port, () => {
  console.log('app listening on port', port);
});
