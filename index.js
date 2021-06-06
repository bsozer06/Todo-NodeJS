const express = require("express");
const pool = require("./db");       // our module

const app = express();

app.use(express.json())     // -> req.body

/** ROUTES **/

// get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
})

// create a todo
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]
        );
        res.json(newTodo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;              // WHERE
        const { description } = req.body;       // SET
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id= $2", [description, id]
            );
        res.json("Todo güncellendi.");

    } catch (error) {
        console.error(error.message);
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Silme işlemi başarılı...");
    } catch (error) {
        console.error(error.message);
    }
})


app.listen(3000, () => {
    console.log("server 3000 portunda dinleniyor...");
})