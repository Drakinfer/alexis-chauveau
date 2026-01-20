type StackItem = { _id: string; name: string; type: string };

const labelByType: Record<string, string> = {
  language: 'Langages',
  framework: 'Frameworks',
  tool: 'Outils',
};

function groupByType(items: StackItem[]) {
  return items.reduce<Record<string, StackItem[]>>((acc, item) => {
    (acc[item.type] ??= []).push(item);
    return acc;
  }, {});
}

export default function Stacks({
  stack,
  onPrev,
  onNext,
}: {
  stack: StackItem[];
  onPrev: () => void;
  onNext: () => void;
}) {
  const grouped = groupByType(stack);

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        Techniques
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {(['language', 'framework', 'tool'] as const).map((t) => (
          <div
            key={t}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <h2 className="text-lg font-medium">{labelByType[t]}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {(grouped[t] ?? []).map((x) => (
                <span
                  key={x._id}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90"
                >
                  {x.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
