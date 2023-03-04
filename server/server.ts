import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { Application } from 'express';
import cors from "cors";
import { connect } from 'mongoose';
import { createClient } from 'redis';
export const client = createClient({
    url: process.env.REDIS_URL
});
client.on('error', err => console.log('Redis Client Error', err));

connectRedis().catch(err => console.log(err));

async function connectRedis() {
    await client.connect();
    console.log("connected Redis");
}



const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors());


run().catch(err => console.log(err));


async function run() {

    await connect(`mongodb+srv://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.CLUSTER_MONGO}.10uqsci.mongodb.net/${process.env.DB}`);
    console.log("connected DB");
}
import profileRouter from "./routes/profile.router";

app.use('/api/profile', profileRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
