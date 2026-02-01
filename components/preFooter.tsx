"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import "@/styles/components/preFooter.css";

export function PreFooter() {
  return (
    <section className="section__N4k2P">
      <div className="section__content__N4k2P">
        <div className="preFooter__root__Q7w3E">
          <h2 className="preFooter__headline__V8m6T">
            <strong>Plan the present. Build the future.</strong>
          </h2>

          <div className="preFooter__right__H2j5L">
            <button
              type="button"
              className="button__root__ZxcvB button__kind-secondary__R5j2s button__size-medium__L9d7h"
            >
              Contact sales
            </button>

            <button
              type="button"
              className="button__root__ZxcvB button__kind-primary__R5j2s button__size-medium__L9d7h"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
