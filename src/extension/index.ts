import type NodeCG from "nodecg/types";
import { setContext } from "./utils/context";
import { startIntervalSceneModule } from "./modules/interval-scene";

export default async (nodecg: NodeCG.ServerAPI) => {
  await setContext(nodecg);

  /**
   * Extension modules
   */
  startIntervalSceneModule();
};
