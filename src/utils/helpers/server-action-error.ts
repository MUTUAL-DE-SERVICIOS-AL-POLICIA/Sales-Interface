import "server-only";

import { unstable_rethrow } from "next/navigation";
import { redirect } from "next/navigation";

import { ResponseData } from "@/utils/interfaces";
import { GatewayRequestError } from "@/utils/services/GatewayRequestError";
import { invalidSessionUrl } from "./urls";

export function webActionError(error: unknown): ResponseData | undefined {
  unstable_rethrow(error);

  if (!(error instanceof GatewayRequestError)) return undefined;
  if (error.code === "SESSION_INVALID")
    redirect(invalidSessionUrl().toString());

  return {
    error: true,
    code: error.code,
    message: error.message,
  };
}
