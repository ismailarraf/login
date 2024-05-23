import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const port = 80;

const users = [];

app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find User
        const findUser = users.find((data) => email === data.email);
        if (findUser) {
            return res.status(400).send("Email already exists!");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        users.push({ email, password: hashPassword });
        console.log(users);
        res.status(200).send("User registered successfully!");
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = users.find((data) => email === data.email);
        if (!findUser) {
            return res.status(404).send('Email not found!');
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if (passwordMatch) {
            res.status(200).send('Login successful!');
        } else {
            res.status(400).send("Wrong email or password!");
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
