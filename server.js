
/* ------------------------ Npm packages and others files  declaration ------------------------ */

const express         = require('express');
const app             = express('localhost');
const mongoose        = require('mongoose');
const { loggers, query } = require('winston');
const winston = require('winston/lib/winston/config');
const Movie           = require("./MovieModel.js");


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

app.delete('api/deleteData/',function(res,req){
    thing.delete(({summary: query.params.summary}).then(),
    res.status(200).json({
        message: 'Deleted!'
      })
      .catch(
        (error) => {
          res.status(400).json({
            error: error
          })    
        }) 
    );
});


app.put('/api/putData', function(req, res) {
    const thing = new Thing({
        name: query.body.name,
         summary: query.body.summary,
        img: query.body.img,
    });
    Thing.updateOne({id: query.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

/* --------------------------- Database connection and Server listen --------------------------- */

mongoose.connect( "mongodb://127.0.0.1:27017/task").then(async res => {
    app.listen(4000, () => {
        
    console.log('Database connection successful and Server running on 4000');
    });
  }).catch(err => console.log(err));



