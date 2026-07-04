import "server-only"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "./likes-redis"

// Same Upstash Redis instance as the photo-likes feature, separate prefix +
// window: 5 passcode attempts per IP per 10 minutes. Casual friction only —
// `redis` is null when Upstash isn't configured, in which case the resume
// route just skips rate limiting.
export const resumeRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "rl:resume",
    })
  : null
