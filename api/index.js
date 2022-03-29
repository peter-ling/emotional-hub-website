import bodyParser from "body-parser";
import e from "cors";
import cors from "cors";
import express from "express";
import {MongoClient} from "mongodb"; 

const api = express.Router();
let conn = null; 
let db = null; 
let Users = null; 

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";

const initApi = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);

  // conn = await MongoClient.connect("mongodb://127.0.0.1:27017"); 
  conn = await MongoClient.connect(MONGODB_URL);
  db = conn.db("project_db"); 
  Users = db.collection("users"); 
};

api.use(bodyParser.json());
api.use(cors());

api.use("/users/:id", async (req, res, next) => {

  let id_to_find = req.params.id; 
  let user = await Users.findOne({id: id_to_find});

  if (!user) {
    res.status(404).json({error: "User does not exist!"})
    return; 
  }

  res.locals.user = user; 
  next(); 
});

api.get("/users/:id", async (req, res) => {

  let user = res.locals.user; 
  res.json(user);

}); 

api.post("/users", async (req, res) => {
  
  let userid = req.body.id;
  let obj = {
    "id": userid, 
    "mood": "", 
    "responses": []
  }; 
  Users.insertOne(obj); 
  res.json(obj); 
}); 

api.patch("/users/:id", async (req, res) => {

  let user = res.locals.user;
  let userId = user.id; 
  let request = req.body; 

  if ("mood" in request){
    user.mood = request.mood; 

  } else if ("response" in request) {
    let pair = request.response; 
    user.responses.push(pair); 

  } else {
    user.responses = []; 
  }
  await Users.replaceOne({id: userId}, user);
  res.json(user); 
}); 

export default initApi;
