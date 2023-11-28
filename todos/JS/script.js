const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const filepath = path.join(__dirname, '..', 'data', 'todo.js');

class Todo {
    static gettodo() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length === 0) {
                        resolve("No task added")
                    } else {
                        resolve(JSON.parse(data));
                    }
                }
            )
        })
    }

    static addtodo(value) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length === 0) {
                        data = [];
                    } else {
                        data = JSON.parse(data);
                    }

                    const newTodo = {
                        id: uuid.v4(),
                        value
                    };

                    data.push(newTodo);
                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject("can't write");
                            resolve(newTodo); // Return the added task
                        }
                    )
                }
            )
        })
    }

    static editTodo(id, value) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, 
                { encoding: 'utf-8' },
                (err, data) => {
                if (err) return reject(err.message)

                let todos;
                if (data.length === 0) {
                    todos = [];
                } else {
                    todos = JSON.parse(data);
                }

                const index = todos.findIndex((todo) => todo.id === id);
                if (index !== -1) {
                    todos[index].value = value;

                    fs.writeFile(filepath,
                    JSON.stringify(todos), // array to JSON string
                    (err) => {
                        if (err) return reject("cant write to file");
                        resolve("Task edited successfully");
                    });
                } else {
                    reject("Task not found");
                }
            });
        });
    }

    static deleteTodo(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath,
                { encoding: 'utf-8' },
                (err, data) => {
                if (err) return reject(err.message);


                let todos;
                if (data.length === 0) {
                    todos = [];
                } else {
                    todos = JSON.parse(data);
                }


                const index = todos.findIndex((todo) => todo.id === id);
                if (index !== -1) {
                    todos.splice(index, 1); // splice(index to remove, how many todos to remove)

                    fs.writeFile(filepath, JSON.stringify(todos), (err) => {
                        if (err) return reject("cant write");
                        resolve("Task deleted successfully");
                    });
                } else {
                    reject("Task not found");
                }
            });
        });
    }
}
module.exports = Todo;