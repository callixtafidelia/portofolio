import { config, fields, collection } from "@keystatic/core"
import { wrapper } from "@keystatic/core/content-components"

// GitHub storage mode is used in production once the Keystatic GitHub App
// secrets are present (set them in Vercel). Without those env vars — e.g. local
// dev or a build without secrets — it falls back to local mode so the build
// still succeeds and you can edit offline. Both modes read the same committed
// content, so the public site is identical either way.
//
// IMPORTANT: this file is imported by BOTH the server API route AND the
// browser-side Keystatic admin bundle. Next.js only inlines NEXT_PUBLIC_-
// prefixed env vars into client code, so the gate MUST use a NEXT_PUBLIC_ var
// (not e.g. KEYSTATIC_GITHUB_CLIENT_ID) — otherwise the server resolves
// 'github' while the browser silently resolves 'local', causing every
// collection to 404 on GET /api/keystatic/tree in production.
const useGitHubStorage = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG

export default config({
  storage: useGitHubStorage
    ? { kind: "github", repo: "callixtafidelia/portofolio" }
    : { kind: "local" },
  ui: {
    brand: { name: "Callixta · CMS" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      // The entry's on-disk key (folder/file name) is the URL slug, derived
      // from the title via the slug field below.
      slugField: "title",
      path: "content/posts/*",
      // Store the `content` field as the MDX body; everything else becomes
      // YAML frontmatter in the same .mdx file.
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedAt"],
      schema: {
        // `title` = the human title (required); its derived slug is the URL.
        title: fields.slug({
          name: { label: "Title", validation: { isRequired: true } },
          slug: {
            label: "Slug (URL)",
            description: "Auto-generated from the title — this is the /blog/<slug> path.",
          },
        }),
        category: fields.select({
          label: "Category",
          description: "Add more options in keystatic.config.ts when you need them.",
          options: [
            { label: "Machine Learning", value: "Machine Learning" },
            { label: "Deep Learning", value: "Deep Learning" },
            { label: "Data Visualization", value: "Data Visualization" },
          ],
          defaultValue: "Machine Learning",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Short description shown on the /blog list page.",
          multiline: true,
        }),
        publishedAt: fields.date({ label: "Published at" }),
        readTime: fields.text({ label: "Read time", defaultValue: "5 min read" }),
        author: fields.text({ label: "Author", defaultValue: "Callixta Fidelia C" }),
        coverImage: fields.image({
          label: "Cover image (optional)",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Drafts are hidden from the public site.",
          defaultValue: true,
        }),
        content: fields.mdx({
          label: "Content",
          description:
            "The article body — headings, lists, quotes, code blocks, images, and Note/Highlight callouts.",
          // Inline images uploaded in the editor are saved here and referenced
          // by an absolute /images/posts/... URL.
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
          // Medium-style callout blocks — insert them from the editor's "+" menu.
          components: {
            Note: wrapper({
              label: "Note",
              description: "A subtle indigo info callout.",
              schema: {},
            }),
            Highlight: wrapper({
              label: "Highlight",
              description: "A highlighted key-takeaway callout.",
              schema: {},
            }),
          },
        }),
      },
    }),

    projects: collection({
      label: "Project notebooks",
      // The entry's on-disk key (folder/file name) is the URL slug, used as
      // ?project=<slug> on /projects.
      slugField: "title",
      path: "content/projects/*",
      format: { data: "json" },
      columns: ["title", "contentSource"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        // Only "quarto-html" is wired up today — a pre-rendered Quarto HTML
        // upload, rendered directly in an iframe. The old hardcoded
        // component-block case studies (Tariff, NHL) were removed in favor
        // of this collection.
        contentSource: fields.select({
          label: "Content source",
          options: [{ label: "Quarto HTML upload", value: "quarto-html" }],
          defaultValue: "quarto-html",
        }),
        excerpt: fields.text({
          label: "Short description (optional)",
          multiline: true,
        }),
        cardImage: fields.image({
          label: "Card image",
          description:
            "Shown on the /projects grid. If left empty, the card falls back to a gradient placeholder.",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        category: fields.text({
          label: "Category",
          description: "Short tag shown under the title on the card, e.g. \"Sports Analytics & Statistical Modeling\".",
        }),
        skills: fields.array(
          fields.text({ label: "Skill" }),
          {
            label: "Skills",
            description: "Tags shown on the card, e.g. R, Python, Regression.",
            itemLabel: (props) => props.value || "Skill",
          }
        ),
        githubUrl: fields.url({
          label: "GitHub URL (optional)",
          description: "Linked from the card's GitHub button.",
        }),
        order: fields.integer({
          label: "Manual order on /projects (optional)",
          description: "Lower numbers appear first. Leave empty to sort after ordered projects.",
          validation: { isRequired: false },
        }),
        htmlFile: fields.file({
          label: "Rendered Quarto HTML",
          description:
            "Upload the .html file produced by `quarto render` (use embed-resources: true in the .qmd YAML so images/CSS are inlined into one file).",
          directory: "public/content/projects-html",
          publicPath: "/content/projects-html/",
          validation: { isRequired: true },
        }),
      },
    }),

    photos: collection({
      label: "Photography",
      slugField: "title",
      path: "content/photos/*",
      format: { data: "json" },
      columns: ["title", "location"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        location: fields.text({ label: "Location" }),
        date: fields.text({ label: "Date (e.g. March 2024)" }),
        camera: fields.text({ label: "Camera" }),
        lens: fields.text({ label: "Lens" }),
        editingNotes: fields.text({ label: "Post-processing notes", multiline: true }),
        beforeImage: fields.image({
          label: "Before (unedited)",
          directory: "public/photography",
          publicPath: "/photography/",
          validation: { isRequired: true },
        }),
        afterImage: fields.image({
          label: "After (edited)",
          directory: "public/photography",
          publicPath: "/photography/",
          validation: { isRequired: true },
        }),
        featured: fields.checkbox({ label: "Feature in Most Loved seed", defaultValue: false }),
        order: fields.integer({ label: "Manual order (optional)", validation: { isRequired: false } }),
      },
    }),
  },
})
