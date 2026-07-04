"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Heart, Trophy, Images } from "lucide-react"
import { RowsPhotoAlbum, MasonryPhotoAlbum, type Photo as AlbumPhoto } from "react-photo-album"
import "react-photo-album/rows.css"
import "react-photo-album/masonry.css"
import Sidebar from "@/components/sidebar"
import BeforeAfterHold from "./BeforeAfterHold"
import type { Photo } from "../lib/getPhotos"

// Switch to "masonry" here to use MasonryPhotoAlbum instead. Default: justified rows.
const LAYOUT: "rows" | "masonry" = "rows"

const VISITOR_KEY = "callixta-visitor-id"
const LIKED_KEY = "callixta-photo-liked"

/* ── Shared upvotes: counts from the server, "which I liked" from localStorage ── */
function usePhotoLikes() {
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [visitorId, setVisitorId] = useState<string | null>(null)

  // Anonymous visitor id + this visitor's liked set (localStorage is ONLY used
  // for these two things — never for shared counts).
  useEffect(() => {
    let vid = localStorage.getItem(VISITOR_KEY)
    if (!vid) {
      vid = crypto.randomUUID()
      localStorage.setItem(VISITOR_KEY, vid)
    }
    setVisitorId(vid)
    try {
      const raw = localStorage.getItem(LIKED_KEY)
      if (raw) setLiked(new Set(JSON.parse(raw) as string[]))
    } catch {}
  }, [])

  // Hydrate real shared counts on mount.
  useEffect(() => {
    let alive = true
    fetch("/api/likes")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d?.counts) setCounts(d.counts) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  const toggle = useCallback((id: string) => {
    if (!visitorId) return
    const nowLiked = !liked.has(id)

    // Optimistic UI
    setLiked((prev) => {
      const n = new Set(prev)
      nowLiked ? n.add(id) : n.delete(id)
      try { localStorage.setItem(LIKED_KEY, JSON.stringify([...n])) } catch {}
      return n
    })
    setCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + (nowLiked ? 1 : -1)) }))

    // Reconcile with the server (source of truth)
    fetch("/api/likes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ photoId: id, visitorId, liked: nowLiked }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d && typeof d.count === "number") setCounts((prev) => ({ ...prev, [id]: d.count })) })
      .catch(() => {})
  }, [liked, visitorId])

  const countFor = useCallback((id: string) => counts[id] ?? 0, [counts])

  return { liked, toggle, countFor }
}

function LikeButton({
  liked, count, onToggle, size = "sm",
}: {
  liked: boolean; count: number; onToggle: () => void; size?: "sm" | "lg"
}) {
  const px = size === "lg" ? "px-3.5 py-2" : "px-3 py-1.5"
  const icon = size === "lg" ? 17 : 14
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      aria-label={liked ? "Unlike" : "Like"}
      aria-pressed={liked}
      className={`group/like flex items-center gap-1.5 rounded-full backdrop-blur-md border transition-all duration-200 ${px} ${
        liked
          ? "bg-rose-500/25 border-rose-400/50 text-rose-200"
          : "bg-black/50 border-white/20 text-white/90 hover:bg-black/70"
      }`}
    >
      <motion.span
        key={liked ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: liked ? [1, 1.35, 1] : 1 }}
        transition={{ duration: 0.35 }}
        className="flex"
      >
        <Heart size={icon} className={liked ? "fill-rose-400 text-rose-400" : "group-hover/like:text-rose-300"} />
      </motion.span>
      <span className="text-xs font-body tabular-nums">{count}</span>
    </button>
  )
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { liked, toggle, countFor } = usePhotoLikes()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Live "Most Loved" — top 3 by shared score, reorders as counts change.
  const mostLoved = useMemo(
    () => [...photos].sort((a, b) => countFor(b.id) - countFor(a.id)).slice(0, 3),
    [photos, countFor]
  )

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null

  const closeModal = () => setSelectedIndex(null)
  const goPrev = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  )
  const goNext = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  )

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selectedIndex])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedIndex, goPrev, goNext])

  const openPhoto = (id: string) => setSelectedIndex(photos.findIndex((p) => p.id === id))

  const rankStyles = ["text-amber-300 border-amber-400/40", "text-slate-200 border-white/30", "text-orange-300 border-orange-400/40"]

  // react-photo-album input (real px width/height → justified layout, no aspect tags)
  const albumPhotos = useMemo<(AlbumPhoto & { id: string; title: string; location: string })[]>(
    () => photos.map((p) => ({
      key: p.id, src: p.afterSrc, width: p.width, height: p.height,
      alt: p.title, id: p.id, title: p.title, location: p.location,
    })),
    [photos]
  )

  const AlbumComponent = LAYOUT === "masonry" ? MasonryPhotoAlbum : RowsPhotoAlbum

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#0a0e1a] text-white">
        <Sidebar active="photography" onToggle={setSidebarCollapsed} />

        <main className="flex-1 overflow-y-auto py-8 relative z-10" style={{ marginLeft: isMobile ? 0 : "40px" }}>
          <div className={`max-w-6xl mx-auto ${isMobile ? "px-4" : "px-6"}`}>

            {/* Back to Home */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 transition-all duration-300 hover:translate-x-1 group">
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Back to Home</span>
              </a>
            </motion.div>

            {/* Themed header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-12 text-center">
              <div className="flex items-center gap-4 mb-4 justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Camera size={24} className="text-white" />
                </div>
                <h1 className={`font-semibold playfair ${isMobile ? "text-4xl sm:text-5xl" : "text-6xl"}`}>
                  Through <span className="text-gradient-enhanced italic">My Lens</span>
                </h1>
              </div>
              <p className={`text-gray-300 leading-relaxed ${isMobile ? "text-base sm:text-lg" : "text-xl"}`}>
                Moments I&apos;ve captured, twice over — press and hold any photo to see it before the edit
              </p>
            </motion.div>

            {photos.length === 0 ? (
              <div className="text-center py-24 border border-white/10 rounded-2xl bg-slate-900/40">
                <Camera size={30} className="mx-auto mb-4 text-slate-600" />
                <p className="text-gray-400">No photos yet.</p>
                <p className="font-mono-accent text-xs tracking-widest uppercase text-gray-600 mt-2">
                  Add one in Keystatic → Photography
                </p>
              </div>
            ) : (
              <>
                {/* Most Loved */}
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-14">
                  <div className="flex items-center gap-2.5 mb-5">
                    <Trophy size={18} className="text-amber-400" />
                    <h2 className="font-body text-xs tracking-[0.25em] uppercase text-gray-300">Most Loved</h2>
                    <span className="flex-1 h-px bg-white/10 ml-2" />
                  </div>
                  <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}>
                    {mostLoved.map((photo, i) => (
                      <motion.div
                        key={photo.id}
                        layout
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="photo-card group relative overflow-hidden rounded-xl cursor-pointer bg-slate-900 aspect-[4/3]"
                        onClick={() => openPhoto(photo.id)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center"><Camera size={24} className="text-slate-700" /></div>
                        <img src={photo.afterSrc} alt={photo.title} loading="lazy" className="photo-img absolute inset-0 w-full h-full object-cover" />
                        <div className="photo-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                        <span className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border font-body text-[11px] tracking-wider ${rankStyles[i]}`}>
                          #{i + 1}
                        </span>
                        <div className="absolute top-3 right-3">
                          <LikeButton liked={liked.has(photo.id)} count={countFor(photo.id)} onToggle={() => toggle(photo.id)} />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 p-4">
                          <p className="font-body text-base text-white/90 flex items-center gap-1.5">
                            <MapPin size={13} className="text-white/50" />{photo.location}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* The Collection — justified rows via react-photo-album */}
                <div className="flex items-center gap-2.5 mb-5">
                  <Images size={18} className="text-amber-400" />
                  <h2 className="font-body text-xs tracking-[0.25em] uppercase text-gray-300">The Collection</h2>
                  <span className="flex-1 h-px bg-white/10 ml-2" />
                  <span className="font-body text-[11px] tracking-widest text-gray-500">{String(photos.length).padStart(2, "0")}</span>
                </div>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <AlbumComponent
                    photos={albumPhotos}
                    spacing={20}
                    {...(LAYOUT === "rows"
                      ? { targetRowHeight: isMobile ? 200 : 300 }
                      : { columns: isMobile ? 1 : 3 })}
                    render={{
                      image: (_props, { photo, index, width, height }) => {
                        const p = photo as AlbumPhoto & { id: string; title: string; location: string }
                        return (
                          <div
                            className="photo-card group relative overflow-hidden rounded-xl cursor-pointer bg-slate-900"
                            style={{ width, height }}
                            onClick={() => setSelectedIndex(index)}
                          >
                            <img
                              src={p.src}
                              alt={p.title}
                              loading="lazy"
                              className="photo-img absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="photo-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                            <span className="absolute top-4 left-4 font-body text-[11px] tracking-widest text-white/70 mix-blend-difference">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="absolute top-3.5 right-3.5">
                              <LikeButton liked={liked.has(p.id)} count={countFor(p.id)} onToggle={() => toggle(p.id)} />
                            </div>
                            <div className="photo-caption absolute bottom-0 inset-x-0 p-5">
                              <p className="font-body text-lg text-white/90 flex items-center gap-1.5">
                                <MapPin size={14} className="text-white/50" />{p.location}
                              </p>
                            </div>
                          </div>
                        )
                      },
                    }}
                  />
                </motion.div>
              </>
            )}

            <div className="h-16" />
          </div>
        </main>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/96 backdrop-blur-lg" />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl flex flex-col gap-4"
              style={{ maxHeight: "94vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-white/10" style={{ height: isMobile ? "50vh" : "64vh" }}>
                <BeforeAfterHold key={selectedPhoto.id} beforeSrc={selectedPhoto.beforeSrc} afterSrc={selectedPhoto.afterSrc} />

                <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
                  <X size={15} />
                </button>
                <div className="absolute bottom-4 right-4 z-20">
                  <LikeButton liked={liked.has(selectedPhoto.id)} count={countFor(selectedPhoto.id)} onToggle={() => toggle(selectedPhoto.id)} size="lg" />
                </div>
              </div>

              <div className="flex items-stretch gap-3">
                <button onClick={goPrev} aria-label="Previous" className="flex-shrink-0 w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-105">
                  <ChevronLeft size={18} />
                </button>

                <div className="flex-1 bg-slate-900/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
                  <div className="mb-3">
                    <p className="font-body text-xl sm:text-2xl text-white flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-400/90" />{selectedPhoto.location}
                    </p>
                  </div>
                  <div className={`grid gap-x-6 gap-y-2 ${isMobile ? "grid-cols-2" : "grid-cols-3"} border-t border-white/10 pt-3`}>
                    <Meta label="Date" value={selectedPhoto.date} />
                    <Meta label="Camera" value={selectedPhoto.camera} />
                    <Meta label="Editor" value={selectedPhoto.lens} />
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase text-gray-600 mb-1">Description</p>
                    <p className="text-gray-300 text-[13px] leading-relaxed">{selectedPhoto.editingNotes}</p>
                  </div>
                </div>

                <button onClick={goNext} aria-label="Next" className="flex-shrink-0 w-11 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-105">
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-body text-[9px] tracking-[0.25em] uppercase text-gray-600 mb-0.5">{label}</p>
      <p className="text-white text-[13px] leading-snug">{value}</p>
    </div>
  )
}
