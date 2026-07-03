import PhotoGallery from "./components/PhotoGallery"
import { getPhotos } from "./lib/getPhotos"

// Server Component: reads Keystatic-managed photos (with real dimensions) and
// hands them to the client gallery. Nothing hardcoded.
export default async function PhotographyContent() {
  const photos = await getPhotos()
  return <PhotoGallery photos={photos} />
}
