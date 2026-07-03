// Dev-only route (excluded from static export via the `.keystatic.tsx`
// pageExtension gate). The Keystatic admin app is mounted by the sibling
// layout (layout.keystatic.tsx → keystatic.tsx); this page renders nothing.
export default function Page() {
  return null
}
