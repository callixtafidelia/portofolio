// Dev-only layout (excluded from static export via the `.keystatic.tsx`
// pageExtension gate). Mounts the Keystatic admin SPA so it persists across
// its internal client-side routing. Does not render page children by design.
import KeystaticApp from "./keystatic"

export default function KeystaticLayout() {
  return <KeystaticApp />
}
