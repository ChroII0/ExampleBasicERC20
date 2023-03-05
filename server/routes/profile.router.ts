import { getDataProfile } from "../controller/profile.controller";
import { router } from "../server";







router.get("/profile", getDataProfile);

export { router as routerProfile };