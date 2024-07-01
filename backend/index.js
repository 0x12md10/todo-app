const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const zod = require("zod");
const {Todo} = require("./db/index")
const PORT = 3000;


const app = express();

app.use(express.json())


app.get("/todos" , async (req,res)=> {
    // return all todos

    const todos = await Todo.find({});
    if(todos) {
       return res.status(200).json({todos});
    }

    res.status(400).json({msg : "can't fetch todos"});
    
    

})

app.post("/todo" , async (req,res)=> {
    // create a new todo
    // {
    // title : "title",
    // description : "desc",
    // isDone : false (boolean)
    // }
    const {title,description} = req.body;
    const newTodoSchema = zod.object({
        title : zod.string().max(100, "title length cannot be more than 100."),
        description : zod.string().max(100, "description length cannot be more than 100.")
    })
    const parsedInput = newTodoSchema.safeParse({title,description});
    if(!parsedInput.success) {
        return res.status(400).json({msg : "wrong inputs." , error : parsedInput.error.issues[0].message})
    }
    const newTodo = await Todo.create({title,description});
    res.status(201).json({msg : "todo created" , todo : newTodo});
})

app.put("/todo/:id" ,async (req,res)=> {
    // update todo field (isDone)
    const TodoId = req.params.id;
    // const todo = await Todo.findOne({_id : TodoId});

    // const isDone = !todo.isDone;
    // const updatedTodo = await Todo.updateOne({_id : TodoId},{isDone},{new : true});
    const result = await Todo.findTodoByIdAndToggle(TodoId);
    return res.status(200).json({msg : "ok" , result})
})

app.use((err,req,res,next)=> {
    console.log(err);
    res.status(400).json({err : err})
})


async function startServer() {
   mongoose.connect(process.env.MONGO_URL)
    .then((val)=> {
        console.log("Connected to db");

        app.listen(PORT , ()=> {
            console.log("App listening port " + PORT)
        })
    })
    .catch((err)=> {
        console.log("cannot connect to db.")
    })
}

startServer()