//the main backend page

//require dotenv and invoke it
require('dotenv').config();

const cors = require('cors')

// bring in express
const express = require('express');

//set a variable of app to run the express method
const app = express();

//set a port - listen for changes on the port
const port = 4000;

//require statement and variable for mongoose
const mongoose = require('mongoose');

//import routes
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comments')

app.use(express.json(), cors()); //looks for body in the request,  will parse i and attaches it to req object

//log out path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});

//attach route to the app
app.use('/api/workouts/', workoutRoutes) //attaches all workout to app
app.use('/api/user', userRoutes)
app.use('/api/comments', commentRoutes)
//serve static files from public/uploads

app.use('/public/uploads', express.static('public/uploads'))

//pull username and password from env
const mongoUsername = process.env.MONGODB_USERNAME
const mongoPassword = process.env.MONGODB_PASSWORD

//get mongo link
const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.p3cmelg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


//define the home route for backend
app.get('/', (req, res) => {  //pass in request and response, what is sent up and what is sent down
    //what happens at that route
    res.send('Helloooo this is ur express server'); //message shown when we navigate to this page
});

//listen to changes (port 4000)
app.listen(port, () =>{
    console.log(`express server is running on http://localhost:${port}`);
});


//mongo connection using mongoose
mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas', err)
    })
    