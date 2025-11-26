import type NodeCG from "nodecg/types";
export type NodeCGServer = NodeCG.ServerAPI;

let nodecg: NodeCGServer;

export async function setContext(ctx: NodeCGServer) {
  return new Promise((res) => {
    ctx.on("serverStarted", () => {
      nodecg = ctx;
      res(true);
    });
  });
}

export function getContext(): NodeCGServer {
  return nodecg;
}
