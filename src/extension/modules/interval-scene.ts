import { getContext } from "../utils/context";

export const startIntervalSceneModule = () => {
  const nodecg = getContext();

  const router = nodecg.Router();

  router.get("/test", (_, res) => {
    res.json("test");
  });

  nodecg.mount("/", router);
};
