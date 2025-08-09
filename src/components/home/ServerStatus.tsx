"use server";

import { getAllStatus } from "@/lib/mcstatus";
import { ServerStatusClient } from "./ServerStatusClient";

export const ServerStatus = async () => {
  const status = await getAllStatus();
  return (
    <ServerStatusClient status={status} />
  )
}
