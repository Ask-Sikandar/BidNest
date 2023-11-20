const express= require('express');

const app=express();
app.use(express.json());
const db = require('./db');

//register user
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, name, contact } = req.body;

        // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.query(
            "INSERT INTO users (username, email, password, name, contact) VALUES (?, ?, ?, ?, ?)",
            [username, email, password, name, contact]
        );
        res.status(200).send("User added successfully"); // Assuming the response structure here
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error adding user");
    }
});
//login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists in the database
        const user = await db.query(
            "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
        );

        if (user.length === 1) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error during login");
    }
});



app.listen(3000,()=>{
    console.log("server has started on port 3000");
})