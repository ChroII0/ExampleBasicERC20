import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { Application } from 'express';
export const router = express.Router();
import cors from "cors";
import { connect } from 'mongoose';
import { createClient } from 'redis';
import { routerProfile } from './routes/profile.router';
import { routerWakeup } from './routes/wakeup.router';


export const client = createClient({
    url: process.env.REDIS_URL
});
client.on('error', err => console.log('Redis Client Error', err));

connectRedis().catch(err => console.log(err));

async function connectRedis() {
    await client.connect();
    const isCountExist = await client.hExists("ip_counts", "total_count");
    const isDataExist = await client.exists("data");
    const isAccessTimeExist = await client.exists("access_time");
    if (!isCountExist) {
        await client.hSet("ip_counts", "total_count", 0);
    }
    if (!isDataExist) {
        await client.set("data", "");
    }
    if (!isAccessTimeExist)
    {
        await client.set("access_time", "");
    }
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


app.use('/api', routerProfile);
app.use('/req', routerWakeup);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
