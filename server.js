
/* ------------------------ Npm packages and others files  declaration ------------------------ */

const express         = require('express')
const app             = express('localhost');
const http            = require('http');
const https           = require('https');
const fs              = require('fs')
const bodyParser      = require('body-parser')
const mongoose        = require('mongoose');

const Movie           = require("./MovieModel.js")

const db_options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }


app.post("/api/addData/",function(req,res){

     console.log('incoming',req.query)
    if(req.query.name==undefined || req.query.name==null || req.query.img==undefined || req.query.img=="" || req.query.summary==undefined || req.query.summary==null)
    {
        return res.status(400).send({message:"All fields are require"})
    }
    const movie = new Movie()

    movie.name = req.query.name
    movie.img  = req.query.img
    movie.summary  = req.query.summary

    movie.save(function(err, result){
        if(err)
        {
            res.status(500).send({message:"Internal server error"})
        }
        else
        {
            res.status(200).send({message:"Data saved successfully", data:result})
        }
    })

});

app.get("/api/getData/",function(req,res){

    Movie.find({})
    .exec(function(err,result){
        if(err)
        {
            res.status(500).send({message:"Internal server error"})
        }
        else
        {
            const dataList = []

            for(var i = 0; i < result.length; i++){

                console.log("Loop working");
                const temp ={}

                temp.name = result[i].name
                temp.img = result[i].img
                temp.summary = result[i].summary

                dataList.push(temp)
            }

            if(dataList.length !== 0)
            {
                res.status(200).send(dataList)
            }
            else
            {
                res.status(200).send("No data found")
            }

        }
    })

});

/* --------------------------- Database connection and Server listen --------------------------- */

mongoose
  .connect( "mongodb://127.0.0.1:27017/task", db_options)
  .then(async res => {

    app.listen(4000, () => {
      console.log('Database connection successful and Server running on 4000');
    });

  })
  .catch(err => console.log(err));




 

