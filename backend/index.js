const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())

app.use(cors())
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


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

app.listen(8080, () => console.log("Server is running at 8080"))