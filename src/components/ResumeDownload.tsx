"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Download, X } from "lucide-react"

interface ResumeDownloadProps {
  className: string
  iconSize?: number
  iconClassName?: string
  label?: string
}

/**
 * Drop-in replacement for the old static "Download Resume" link. Same button
 * visuals (className is passed straight through); clicking it opens a small
 * centered passcode modal — same fixed/backdrop-blur pattern as the
 * photography lightbox — instead of linking straight to a public file.
 */
export default function ResumeDownload({
  className,
  iconSize = 20,
  iconClassName,
  label = "Download Resume",
}: ResumeDownloadProps) {
  const [open, setOpen] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const close = () => {
    setOpen(false)
    setPasscode("")
    setError(false)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passcode || loading) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passcode }),
      })
      if (!res.ok) {
        setError(true)
        setLoading(false)
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "Callixta_Fidelia_Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      close()
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className={className}
      >
        <Download size={iconSize} className={iconClassName} />
        {label}
      </motion.button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
                onClick={close}
              >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-sm rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-md p-5 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white transition-colors duration-200"
                  >
                    <X size={14} />
                  </button>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <p className="font-body text-sm text-gray-300 pr-6">
                      Enter the passcode to download the resume
                    </p>
                    <input
                      autoFocus
                      type="password"
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value)
                        setError(false)
                      }}
                      placeholder="Passcode"
                      className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white font-body placeholder:text-gray-500 focus:outline-none focus:border-indigo-400/60"
                    />
                    {error && (
                      <p className="font-body text-xs text-rose-400">Incorrect passcode</p>
                    )}
                    <button
                      type="submit"
                      disabled={loading || !passcode}
                      className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white font-body transition-opacity disabled:opacity-60"
                    >
                      {loading ? "Checking..." : "Unlock"}
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
