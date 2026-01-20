import Link from "next/link"
import "@/styles/pages/docs/docs.css"

interface DocArticle {
  id: number
  title: string
  description: string
  slug: string
}

export default function DocsPage() {
  const docArticles: DocArticle[] = [
    {
      id: 1,
      title: "Quick Start Guide",
      description: "Get your project running in under 5 minutes with our step-by-step guide",
      slug: "quick-start",
    },
    {
      id: 2,
      title: "CSS Architecture",
      description: "Master our custom CSS naming convention and organization system",
      slug: "css-architecture",
    },
    {
      id: 3,
      title: "Component Library",
      description: "Explore all available UI components and their usage examples",
      slug: "component-library",
    },
    {
      id: 4,
      title: "Theme System",
      description: "Working with CSS custom properties for light and dark themes",
      slug: "theme-system",
    },
    {
      id: 5,
      title: "Best Practices",
      description: "Learn the recommended patterns and practices for optimal development",
      slug: "best-practices",
    },
    {
      id: 6,
      title: "API Reference",
      description: "Complete reference for all available functions, hooks, and utilities",
      slug: "api-reference",
    },
  ]

  return (
    <div className="docs__container__Q7j3s">
      <section className="docs__header__P8k4q">
        <h1 className="docs__title__Z5m8r">Documentation</h1>
        <p className="docs__subtitle__B3n7p">Comprehensive guides and references to help you build amazing projects</p>
      </section>

      <section className="docs__content__K9j6q">
        <div className="docs__search__L7p3s">
          <div className="docs__search-container__H5k8q">
            <input type="text" className="docs__search-input__Q3j7q" placeholder="Search documentation..." />
            <button className="docs__search-button__P5k8p">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L14.65 14.65"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="docs__articles__Q3j7q">
          {docArticles.map((article) => (
            <Link key={article.id} href={`/docs/${article.slug}`} className="docs__article-link__P5k8p">
              <article className="docs__article__Z7j3s">
                <h3 className="docs__article-title__B9k6p">{article.title}</h3>
                <p className="docs__article-description__L3j7q">{article.description}</p>
                <div className="docs__article-arrow__X4k9p">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
