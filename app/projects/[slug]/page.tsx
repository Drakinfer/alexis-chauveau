import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import { client } from '@/sanity/lib/client';
import { PROJECT_BY_SLUG_QUERY } from '@/sanity/lib/queries';

type Project = {
  title: string;
  slug: string;
  description?: any[];
  stack?: string[];
  links?: { demo?: string; github?: string };
  publishedAt?: string;
};

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:ring-offset-0';
  const styles =
    variant === 'primary'
      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
      : 'border border-white/10 bg-white/5 text-white/90 hover:bg-white/10';

  return (
    <Link href={href} target="_blank" className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 ${className}`}
    >
      {children}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project: Project | null = await client.fetch(PROJECT_BY_SLUG_QUERY, {
    slug,
  });

  if (!project) notFound();

  const dateLabel = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/10"
          >
            <span aria-hidden>←</span>
            Retour
          </Link>
        </div>

        <section className="mt-8">
          <div className="flex flex-col gap-4">
            <div className="w-full flex gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
                  {dateLabel ? <span> {dateLabel}</span> : null}
                </div>

                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
                  {project.title}
                </h1>

                {(project.stack ?? []).length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.stack!.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                ) : null}
              </div>

              {(project.links?.demo || project.links?.github) && (
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  {project.links?.demo ? (
                    <ButtonLink href={project.links.demo} variant="primary">
                      Voir la demo ↗
                    </ButtonLink>
                  ) : null}
                  {project.links?.github ? (
                    <ButtonLink href={project.links.github} variant="secondary">
                      GitHub
                    </ButtonLink>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section className="mt-8 grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-4">
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-white/90">Infos</h2>

              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-white/55">Date</dt>
                  <dd className="text-white/85">{dateLabel ?? '—'}</dd>
                </div>
              </dl>

              <div className="my-6 h-px bg-white/10" />

              <h3 className="text-sm font-semibold text-white/90">Stack</h3>
              {(project.stack ?? []).length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack!.map((t) => (
                    <Tag key={`side-${t}`}>{t}</Tag>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-white/60">Non renseignée.</p>
              )}

              <div className="my-6 h-px bg-white/10" />

              <h3 className="text-sm font-semibold text-white/90">Liens</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.links?.demo ? (
                  <ButtonLink href={project.links.demo} variant="primary">
                    Demo ↗
                  </ButtonLink>
                ) : null}
                {project.links?.github ? (
                  <ButtonLink href={project.links.github} variant="secondary">
                    GitHub
                  </ButtonLink>
                ) : null}
                {!project.links?.demo && !project.links?.github ? (
                  <span className="text-sm text-white/60">—</span>
                ) : null}
              </div>
            </Card>
          </aside>

          {/* Main */}
          <article className="col-span-12 lg:col-span-8">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-white/90">
                  Description
                </h2>
              </div>

              <div className="mt-6">
                {project.description?.length ? (
                  <div>
                    <PortableText value={project.description} />
                  </div>
                ) : (
                  <p className="text-white/70">Pas de description.</p>
                )}
              </div>
            </Card>
          </article>
        </section>
      </div>
    </main>
  );
}
