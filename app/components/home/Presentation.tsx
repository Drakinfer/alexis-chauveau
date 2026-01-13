'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Presentation({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Texte */}
        <div>
          <h1 className="text-4xl sm:text-4xl font-semibold tracking-tight">
            AC Dev : Alexis CHAUVEAU Developpement
          </h1>

          <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
            Développeur full-stack passionné. Je conçois des applications web et
            mobiles robustes avec une approche orientée utilisateur.
          </p>
        </div>

        {/* Image (cachée sur mobile) */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-[280px] h-[280px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/profile.jpg"
              alt="Photo de profil"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-medium">Coordonnées</h2>
            <ul className="mt-2 space-y-1 text-white/80">
              <li>Email : chauveau.alexis.code@gmail.com</li>
              <li>Zone géographique : Ile de France ou visioconférence</li>
              <ul className="mt-2  ml-4">
                <li>
                  <Link
                    href="https://github.com/Drakinfer"
                    className="
    text-indigo-300 
    hover:text-indigo-200 
    underline 
    underline-offset-4 
    decoration-indigo-400/60
    hover:decoration-indigo-300
    transition"
                  >
                    Mon GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/alexis-chauveau-0ab548157/"
                    className="
    text-indigo-300 
    hover:text-indigo-200 
    underline 
    underline-offset-4 
    decoration-indigo-400/60
    hover:decoration-indigo-300
    transition"
                  >
                    Linkedin
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-lg font-medium">Diplôme</h2>
          <p className="mt-1 text-white/80">
            MBA Développeur Full Stack - Titre RNCP de niveau 7 Manager de
            Projet Web Digital -{' '}
            <span className="text-gray-400 italic">MyDigitalSchool</span>
          </p>
          <h2 className="text-lg font-medium">Statut</h2>
          <p className="mt-1 text-white/70">Disponible pour missions / CDI</p>
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
