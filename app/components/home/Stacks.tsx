'use client';

function Pill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
      {children}
    </span>
  );
}

function TechBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((x) => (
          <Pill key={x}>{x}</Pill>
        ))}
      </div>
    </div>
  );
}

export default function Stacks({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const langs = ['JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'];
  const frameworks = ['Next.js', 'React', 'Node.js', 'Express'];
  const tools = ['Git', 'Docker', 'Figma', 'Postman'];

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Techniques
      </h1>
      <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
        Un aperçu rapide de ma stack (données “bateau”).
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <TechBlock title="Langages" items={langs} />
        <TechBlock title="Frameworks" items={frameworks} />
        <TechBlock title="Outils" items={tools} />
      </div>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button
          onClick={onPrev}
          className="rounded-2xl border border-white/15 bg-transparent px-4 py-2 text-sm hover:bg-white/10 transition"
        >
          ← Présentation
        </button>
        <button
          onClick={onNext}
          className="rounded-2xl border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 transition"
        >
          Projets →
        </button>
      </div>
    </div>
  );
}
