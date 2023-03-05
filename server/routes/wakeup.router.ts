import { Request, Response } from 'express';
import { router } from '../server';




router.get("/wakeup", (req: Request, res: Response)=>{
    res.send("server is wakeup");
})


export { router as routerWakeup };