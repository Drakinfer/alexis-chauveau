import Link from 'next/link';

type Settings = {
  brandName: string;
  presentation: string;
  status: string;
  contact?: { email?: string; phone?: string; location?: string };
  links?: { github?: string; linkedin?: string };
  education?: { title: string; school: string; year: string }[];
};

export default function Presentation({
  settings,
  onNext,
}: {
  settings: Settings;
  onNext: () => void;
}) {
  const { brandName, presentation, status, contact, links, education } =
    settings;

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
        {brandName}
      </h1>
      <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
        {presentation}
      </p>

      <p className="mt-3 text-sm text-white/70">
        Statut : <span className="text-white/90">{status}</span>
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-medium">Coordonnées</h2>
          <ul className="mt-2 space-y-1 text-white/80">
            {contact?.email && <li>Email : {contact.email}</li>}
            {contact?.phone && <li>Tél : {contact.phone}</li>}
            {contact?.location && <li>Zone : {contact.location}</li>}
            {(links?.github || links?.linkedin) && (
              <li className="mt-3">
                <div className="text-white/70">Liens :</div>
                <ul className="mt-2 ml-4 border-l border-white/20 pl-4 space-y-2">
                  {links?.github && (
                    <li>
                      <Link
                        href={links.github}
                        className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/60 hover:decoration-indigo-300 transition"
                        target="_blank"
                      >
                        GitHub
                      </Link>
                    </li>
                  )}
                  {links?.linkedin && (
                    <li>
                      <Link
                        href={links.linkedin}
                        className="text-indigo-300 hover:text-indigo-200 underline underline-offset-4 decoration-indigo-400/60 hover:decoration-indigo-300 transition"
                        target="_blank"
                      >
                        LinkedIn
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-medium">Diplômes</h2>
          <div className="mt-2 space-y-3 text-white/80">
            {(education ?? []).length === 0 ? (
              <p className="text-white/70">Aucun diplôme renseigné.</p>
            ) : (
              education!.map((d, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="font-medium">{d.title}</div>
                  <div className="text-white/70">
                    {d.school} — {d.year}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onNext}
          className="rounded-2xl border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 transition"
        >
          Voir mes compétences →
        </button>
      </div>
    </div>
  );
}
