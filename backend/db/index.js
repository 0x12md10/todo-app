const mongoose = require("mongoose");

/*
todo schema -

{
    title : title ,
    description  :description,
    isDone : boolean
}

*/


const todosSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    isDone : {
        type : Boolean,
        required : false,
        default : false
    }
});

// find todo by Id and toggle the completed(boolean) value.

todosSchema.statics.findTodoByIdAndToggle =  async (id) => {
    const todo = await Todo.findOne({_id : id});
    todo.isDone = !todo.isDone;
     await todo.save()
    return {msg : "done"};
}


const Todo = mongoose.model("Todo" , todosSchema);


module.exports = {Todo}