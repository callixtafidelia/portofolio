// Keystatic local-mode API (dev-only route — excluded from the static export
// build by the `.keystatic.ts` pageExtension gate in next.config.ts).
import { makeRouteHandler } from "@keystatic/next/route-handler"
import config from "../../../../../keystatic.config"

export const { POST, GET } = makeRouteHandler({ config })
