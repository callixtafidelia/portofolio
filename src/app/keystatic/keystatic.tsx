// Client wrapper that boots the Keystatic admin SPA. Imported by
// layout.keystatic.tsx. (Regular .tsx module — not a route file.)
"use client"

import { makePage } from "@keystatic/next/ui/app"
import config from "../../../keystatic.config"

export default makePage(config)
