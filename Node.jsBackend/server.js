const exp = require('constants');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path =  require('path');
require('dotenv').config();
require('./db/connection');
const {Solution}=require('./models/solution.model');
const { Author } = require('./models/author.model');
const { payrouter } = require('./pay.route');
const app = express();

const port = process.env.port;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: "*"}));
app.use(helmet());
app.use( express.static('public'));






app.set('view engine','hbs'); //teeling we are using hbs engine
app.set('views', path.join(__dirname, 'views')); //seting the path of hbs

app.use("/instamojo" , payrouter);

//insta mojo routes start

// app.get("/mojosuccess", (req,res)=>{
//   res.render('mojosuccess',{ title: " payment success"});
// });



//insta mojo routes end








// Define a route to render a form
app.get('/', (req, res) => {
  res.render('index',{
    title: 'submit data' 
  });
});

// Define a route to handle the form submission
app.post('/submit', async (req, res) => {
  const { title, content , language , explain } = req.body;
  const author = "Manishankar Rai";
  const author_id = "6484be22c1ec36ce4b5ec609";
  const likes = "0";


  let data = {
    title: title ,
    content: content ,
    language: language ,
    explain : explain ,
    author: "Manishankar Rai",
    author_id: "6484be22c1ec36ce4b5ec609",
    likes: "0"
  };
  let result = await Solution(data).save();
  res.render('submission', { title, content ,language , explain , author , author_id , likes });
});
app.get('/form', (req,res)=>{
      res.render('form');
});
app.get('/getalldata', async(req,res)=>{
  try{
    let result = await Solution.find().sort({date: -1});
    let title = "all data";
    res.render('alldata',{result ,title});
    }
    catch(error){
      let message = "there is an error , please see this... " + error ;
      let title = "error";
      res.render('error',{message , title} );
    }
});
app.get('/getdatabyid/:id', async(req,res)=>{
      try {
        let data = await Solution.findOne({_id: req.params.id});
        console.log("1",data);
        const jsonString = JSON.stringify(data);
        res.redirect(`/gotoupdate?data=${encodeURIComponent(jsonString)}`);
             
      } 
      catch(error){
        let title = "error";
        res.render('error' ,{title} );
      } 
});
app.get('/gotoupdate' , (req,res)=>{ 
  const jsonString = req.query.data;
  const jsonData = JSON.parse(decodeURIComponent(jsonString));
  console.log("2",jsonData);
  let title = 'data by id';
  res.render('databyid', {  jsonData , title });
});
app.post('/updatesolution' , async(req,res)=>{
    try{
        console.log("data update req come");
        const{ id , title , content , explain } = req.body ;
        let data = {
          title: title ,
          content: content ,
          explain: explain
        }
        let result = await Solution.updateOne( 
          {_id: id}, {$set: data}
        );
        console.log("data");
        console.log(result);
        res.render('success' , {title:"success"});
    }
    catch(error){
      let title = "error";
      res.render('error' ,{title} );
    }
    
});
app.get('/deletedata/:id', async(req,res)=>{
  try{
   let result = await Solution.deleteOne({ _id: req.params.id});
   res.render('success' , {title:"success"});
  } 
  catch(error){
    let title = "error";
    res.render('error' ,{title} );
  }  
});
//create author 
app.post('/authorsignup',async(req,res)=>{
   let data = req.body ;
   console.log("data",data);
   let result = await Author(data).save();
   res.send({message: "success" , data: result , value: true});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
