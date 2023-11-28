const express = require("express");
const app = express();
const path = require("path");
const uuid = require("uuid");
app.use(express.urlencoded({ extended: true })); // translator for server
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

let Todo = require("./todos/JS/script");

app.get("/gettodo", async (req, res) => {
    try {
        let data = await Todo.gettodo();
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.post("/addtodo", async (req, res) => {
    let { name } = req.body;
    try {
        let response = await Todo.addtodo(name);
        res.send(response);
    } catch (error) {
        res.status(500).send(error); // status code internal error set krne keliye
    }
});

app.post("/edittodo", async (req, res) => {
    let { id, value } = req.body;
    try {
        await Todo.editTodo(id, value);
        res.send("Task edited successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/deletetodo", async (req, res) => {
    let { id } = req.body;
    try {
        await Todo.deleteTodo(id);
        res.send("Task deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(2222, () => {
    console.log("server started at 2222");
});