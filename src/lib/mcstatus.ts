"use server";

import { statusJava } from "node-mcstatus";

const HOST = "155.254.29.238";
const PORTS = {
  Proxy: 25001,
  Lobby: 25002,
  Survival: 25003,
  BoxPvp: 25004,
  SkyBlock: 25006,
}

export const getStatus = async (port: number = PORTS.Proxy) => {
  const status = await statusJava(HOST, port, { query: true });
  return status;
}

export const getAllStatus = async () => {
  return {
    proxy: await getStatus(PORTS.Proxy),
    lobby: await getStatus(PORTS.Lobby),
    survival: await getStatus(PORTS.Survival),
    boxPvp: await getStatus(PORTS.BoxPvp),
    skyBlock: await getStatus(PORTS.SkyBlock),
  }
}