const express= require('express');
const app=express();
const request=require('request')
const dotenv = require('dotenv');
dotenv.config();

app.set("view engine", "ejs");
app.use('/public', express.static('public'));

app.get("/", (req, res)=>{
    const url = "http://www.omdbapi.com/?apikey=43f9ba0&s=one";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const intial = JSON.parse(body)
            //console.log(data);
            if(intial.Response==='False'){
                res.send("ERROR IN THE DOMAIN");
            }else{
                res.render("home", {data:intial});    
            }
        }else{
            res.send('Error');
        }
    });
});

app.get("/result", (req, res)=>{
    const query = req.query.search;
    const url = "http://www.omdbapi.com/?apikey=43f9ba0&s=" + query;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                res.render("result", {data:data});    
            }
        }else{
            res.send('Error');
        }
    });
});

app.get("/result/:id", (req, res)=>{
    const url = "http://www.omdbapi.com/?apikey=43f9ba0&i=" + req.params.id;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body)
            //console.log(data);
            if(data.Response==='False'){
                res.send("Movie Not Found");
            }else{
                //res.send(data);
                res.render("info", {movie: data});    
            }
        }else{
            res.send('Error');
        }
    });
});


app.get("*", (req, res)=>{
    res.send("Some Error");
});
app.listen(3000, ()=>{
    console.log(`Server has started`);
});