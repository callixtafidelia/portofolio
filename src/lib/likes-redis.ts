import "server-only"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"

// Shared photo upvotes via Upstash Redis. When the env vars are absent (e.g.
// local dev without Upstash), `redis` is null and the API routes degrade
// gracefully — the UI just shows zero counts and optimistic local toggles.
const hasRedis = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)

export const redis = hasRedis ? Redis.fromEnv() : null

export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "60 s"),
      prefix: "rl:photolikes",
    })
  : null

// Sorted set: member = photo id, score = like count (top of ZREVRANGE = most loved).
export const LIKES_KEY = "photo:likes"
// Dedup key TTL — one like per visitor per photo within this window.
export const DEDUPE_TTL = 60 * 60 * 24 * 365 // 1 year
