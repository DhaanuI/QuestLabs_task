const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
require("dotenv").config()


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.use(cors())


app.post("/", async (req, res) => {
    const { usecase, userInput } = req.body

    const requestBody = {
        usecase: usecase,
        userInput: userInput,
    };

    try {
        const data = await fetch("https://gpt-api.richexplorer.com/api/general", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })

        if (!data.ok) {
            throw new Error("API request failed.");
        }

        const responseData = await data.json();

        res.json(responseData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching data from the API." });
    }
})

app.listen(process.env.port, () => console.log(`Server is running at ${process.env.port}`))