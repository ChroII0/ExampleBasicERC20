import { getDataProfile } from "../controller/profile.controller";
import { router } from "../server";
import { Request, Response } from 'express';







router.get("/profile", getDataProfile);

router.get("/wakeup", (req: Request, res: Response) => {
    res.send("server is wakeup");
});

export { router as routerApi };