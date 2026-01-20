import "@/styles/pages/readme/readme.css"

export default function ReadmePage() {
  return (
    <div className="readme__container__L7j3s">
      <section className="readme__header__P8k4q">
        <h1 className="readme__title__Z5m8r">README</h1>
        <p className="readme__subtitle__B3n7p">Project documentation and guidelines</p>
      </section>

      <section className="readme__content__K9j6q">
        <div className="readme__section__H7p3s">
          <h2 className="readme__section-title__Q5k8q">Project Overview</h2>
          <p className="readme__paragraph__L3j7q">
            This project demonstrates a custom CSS architecture with modular organization and consistent naming
            conventions. It's designed to be scalable, maintainable, and optimized for large projects.
          </p>
        </div>

        <div className="readme__section__H7p3s">
          <h2 className="readme__section-title__Q5k8q">Getting Started</h2>
          <div className="readme__code-block__P5k8p">
            <pre className="readme__code__Z7j3s">
              <code>
                {`# Clone the repository
git clone https://github.com/username/project-name.git

# Navigate to the project directory
cd project-name

# Install dependencies
npm install

# Start the development server
npm run dev`}
              </code>
            </pre>
          </div>
        </div>

        <div className="readme__section__H7p3s">
          <h2 className="readme__section-title__Q5k8q">Project Structure</h2>
          <div className="readme__code-block__P5k8p">
            <pre className="readme__code__Z7j3s">
              <code>
                {`project-name/
├── app/                # Next.js App Router pages
│   ├── about/
│   ├── career/
│   ├── contact/
│   ├── docs/
│   ├── get-started/
│   ├── method/
│   ├── pricing/
│   ├── readme/
│   ├── customers/
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── layout/         # Layout components
│   ├── pages/          # Page-specific components
│   ├── ui/             # UI components
│   └── theme-provider.tsx
├── styles/             # CSS files
│   ├── pages/          # Page-specific styles
│   ├── buttons.css
│   ├── colors.css
│   ├── forms.css
│   ├── globals.css
│   ├── layout.css
│   ├── reset.css
│   ├── theme-toggle.css
│   └── typography.css
└── public/             # Static assets`}
              </code>
            </pre>
          </div>
        </div>

        <div className="readme__section__H7p3s">
          <h2 className="readme__section-title__Q5k8q">CSS Naming Convention</h2>
          <p className="readme__paragraph__L3j7q">
            This project uses a unique naming convention for CSS classes to prevent conflicts and improve
            maintainability:
          </p>
          <div className="readme__code-block__P5k8p">
            <pre className="readme__code__Z7j3s">
              <code>
                {`.componentName__elementName__RandomSuffix {
  /* CSS properties */
}`}
              </code>
            </pre>
          </div>
          <p className="readme__paragraph__L3j7q">
            For example: <code>.button__root__ZxcvB</code>, <code>.typography__heading1__T3m8s</code>
          </p>
        </div>

        <div className="readme__section__H7p3s">
          <h2 className="readme__section-title__Q5k8q">Theme System</h2>
          <p className="readme__paragraph__L3j7q">
            The project includes a light and dark theme system using CSS variables. Colors are defined as RGB values for
            flexibility with opacity:
          </p>
          <div className="readme__code-block__P5k8p">
            <pre className="readme__code__Z7j3s">
              <code>
                {`/* Definition */
:root {
  --color-bg-primary: 251, 251, 251;
}

/* Usage */
.element {
  background-color: rgba(var(--color-bg-primary), 1);
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  )
}
