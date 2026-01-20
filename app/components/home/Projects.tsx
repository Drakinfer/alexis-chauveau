'use client';

import Link from 'next/link';
import type { Project } from './HomeSlider';
import { PortableText } from '@portabletext/react';

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

export default function Projects({
  projects,
  onPrev,
}: {
  projects: Project[];
  onPrev: () => void;
}) {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Projets
      </h1>

      {(projects ?? []).length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
          Aucun projet publié pour le moment.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-lg font-medium leading-snug">
                {p.slug ? (
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-white hover:text-indigo-200 transition underline underline-offset-4 decoration-white/20 hover:decoration-indigo-300"
                  >
                    {p.title}
                  </Link>
                ) : (
                  p.title
                )}
              </h3>
              {p.publishedAt ? (
                <span className="shrink-0 text-xs text-white/60">
                  {new Date(p.publishedAt).toLocaleDateString('fr-FR')}
                </span>
              ) : null}

              {p.description ? (
                <PortableText value={p.description} />
              ) : (
                <p className="mt-2 text-white/60">Pas de description.</p>
              )}

              {(p.stack ?? []).length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack!.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              ) : null}

              {p.links?.demo || p.links?.github ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.links?.demo && (
                    <Link
                      href={p.links.demo}
                      target="_blank"
                      className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/60 hover:decoration-indigo-300 transition text-sm"
                    >
                      Demo
                    </Link>
                  )}
                  {p.links?.github && (
                    <Link
                      href={p.links.github}
                      target="_blank"
                      className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/60 hover:decoration-indigo-300 transition text-sm"
                    >
                      GitHub
                    </Link>
                  )}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
