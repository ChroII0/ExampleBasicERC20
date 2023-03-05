import { getDataProfile } from "../controller/profile.controller";
import { router } from "../server";






router.get("/", getDataProfile);


export { router as routerProfile };