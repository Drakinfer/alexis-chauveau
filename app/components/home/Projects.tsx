'use client';

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

export default function Projects({ onPrev }: { onPrev: () => void }) {
  const projects = [
    {
      title: 'Portfolio',
      desc: '3 sections + CMS plus tard',
      tags: ['Next.js', 'Sanity'],
    },
    {
      title: 'App Movies',
      desc: 'Catalogue + favoris + popup détails',
      tags: ['React', 'API'],
    },
    {
      title: 'Dashboard',
      desc: 'CRUD admin minimal',
      tags: ['Next.js', 'Auth'],
    },
  ];

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Projets
      </h1>
      <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
        Quelques projets fictifs pour le moment.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="mt-2 text-white/80 leading-relaxed">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={onPrev}
          className="rounded-2xl border border-white/15 bg-transparent px-4 py-2 text-sm hover:bg-white/10 transition"
        >
          ← Techniques
        </button>
      </div>
    </div>
  );
}
