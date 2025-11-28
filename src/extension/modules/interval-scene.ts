import { IntervalSceneToggle } from "../../types/toggle.interval-scene";
import { getContext } from "../utils/context";

export const startIntervalSceneModule = () => {
  const nodecg = getContext();

  const router = nodecg.Router();

  router.post("/toggle", (_, res) => {
    const replicant = nodecg.Replicant<IntervalSceneToggle>(
      "toggle.interval-scene",
    );

    replicant.value = !replicant.value;

    res.json(replicant.value);
  });

  nodecg.mount("/interval-scene", router);
};
