import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

const SEARCHABLE_ROUTES: string[] = ["/", "/pricing", "/contact", "/docs"]

type SearchIndexEntry = {
    path: string
    blocks: string[] // ✅ page text split into element-level blocks
}

let cached: { builtAt: number; entries: SearchIndexEntry[] } | null = null
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

export const runtime = "nodejs"

function cleanupDom($: cheerio.CheerioAPI) {
    $("script, style, noscript, template").remove()
    $("header, footer, nav").remove()

    // Remove interactive UI junk
    $("button, input, select, textarea, option, label, form").remove()

    // Remove common overlays/portals (Radix, dialogs, tooltips, etc.)
    $(
        [
            "[role='dialog']",
            "[role='alertdialog']",
            "[data-radix-portal]",
            "[data-dismissable-layer]",
            "[data-overlay-container]",
            "[aria-hidden='true']",
            "[hidden]",
            ".sr-only",
            ".visually-hidden",
            ".toast",
            ".toaster",
            ".modal",
            ".dialog",
            ".popover",
            ".tooltip",
        ].join(","),
    ).remove()

    // Best-effort: remove v0/editor overlays if present
    $(
        [
            "[data-v0]",
            "[class*='v0']",
            "[id*='v0']",
            "[class*='editor']",
            "[id*='editor']",
            "[class*='edit-mode']",
            "[id*='edit-mode']",
        ].join(","),
    ).remove()
}

function normalizeText(s: string): string {
    return s.replace(/\s+/g, " ").trim()
}

function uniqueConsecutive(blocks: string[]): string[] {
    const out: string[] = []
    for (const b of blocks) {
        if (!b) continue
        if (out.length === 0 || out[out.length - 1] !== b) out.push(b)
    }
    return out
}

function extractBlocksFromHtml(html: string): string[] {
    const $ = cheerio.load(html)
    cleanupDom($)

    // ✅ Prefer explicitly-scoped content region
    const scoped = $("[data-search-scope]").first()
    const main = $("main").first()
    const body = $("body").first()
    const root = scoped.length ? scoped : main.length ? main : body

    const selectors = [
        "h1, h2, h3, h4, h5, h6",
        "p",
        "li",
        "blockquote",
        "pre",
        "code",
        "td",
        "th",
    ].join(",")

    const blocks: string[] = []
    root.find(selectors).each((_, el) => {
        const text = normalizeText($(el).text())
        // Filter out tiny fragments
        if (text.length >= 10) blocks.push(text)
    })

    // Fallback: if no blocks found, take root text but still keep it as a single block
    if (blocks.length === 0) {
        const fallback = normalizeText(root.text())
        if (fallback) return [fallback]
        return []
    }

    return uniqueConsecutive(blocks)
}

export async function GET(req: Request) {
    try {
        const now = Date.now()
        if (cached && now - cached.builtAt < CACHE_TTL_MS) {
            return NextResponse.json({ entries: cached.entries, cached: true })
        }

        const url = new URL(req.url)
        const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")
        const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "") ?? "https"

        if (!host) {
            return NextResponse.json({ entries: [], error: "Missing host header" }, { status: 500 })
        }

        const baseUrl = `${proto}://${host}`

        const entries: SearchIndexEntry[] = []
        for (const path of SEARCHABLE_ROUTES) {
            const pageUrl = `${baseUrl}${path}`

            const res = await fetch(pageUrl, {
                cache: "no-store",
                headers: { Accept: "text/html" },
            })

            if (!res.ok) continue

            const html = await res.text()
            const blocks = extractBlocksFromHtml(html)

            entries.push({ path, blocks })
        }

        cached = { builtAt: now, entries }
        return NextResponse.json({ entries, cached: false })
    } catch (err) {
        return NextResponse.json(
            { entries: [], error: err instanceof Error ? err.message : "Unknown error" },
            { status: 500 },
        )
    }
}
