import express from "express";
const app = express();
import router from "./router";

const PORT = 3001

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})


app.listen(PORT, () => console.log(`Express application run on http://localhost:${PORT}`))

app.use("/api", router);
