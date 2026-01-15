'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import Presentation from './Presentation';
import Stacks from './Stacks';
import Projects from './Projects';
import { TypedObject } from 'sanity';

type Step = 0 | 1 | 2;

export type Settings = {
  brandName: string;
  presentation: string;
  status: string;
  contact?: { email?: string; phone?: string; location?: string };
  links?: { github?: string; linkedin?: string };
  education?: { title: string; school: string; year: string }[];
};

export type StackItem = { _id: string; name: string; type: string };

export type Project = {
  _id: string;
  title: string;
  slug?: string;
  description: TypedObject[];
  stack?: string[];
  links?: { demo?: string; github?: string };
  publishedAt?: string;
};

const pageVariants = {
  enter: (direction: 1 | -1) => ({
    x: direction === 1 ? 40 : -40,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: 1 | -1) => ({
    x: direction === 1 ? -40 : 40,
    opacity: 0,
    filter: 'blur(6px)',
  }),
};

const pageTransition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function HomeSlider({
  settings,
  stack,
  projects,
}: {
  settings: Settings;
  stack: StackItem[];
  projects: Project[];
}) {
  const [step, setStep] = useState<Step>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: Step) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const next = () => go(Math.min(2, step + 1) as Step);
  const prev = () => go(Math.max(0, step - 1) as Step);

  const sections = useMemo(
    () => [
      {
        id: 'presentation',
        label: 'Présentation',
        node: <Presentation settings={settings} onNext={next} />,
      },
      {
        id: 'techniques',
        label: 'Stacks Technique',
        node: <Stacks stack={stack} onPrev={prev} onNext={next} />,
      },
      {
        id: 'projects',
        label: 'Projets',
        node: <Projects projects={projects} onPrev={prev} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, settings, stack, projects],
  );

  const active = sections[step];

  return (
    <main className="min-h-screen text-white bg-[#0b0f19]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(120,140,255,0.25),transparent_60%)]" />
      </div>

      <header className="sticky top-0 z-10 border-b border-white/10 bg-[#0b0f19]/70 backdrop-blur px-4 sm:px-6 py-3">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3">
          <div className="font-semibold tracking-tight">Portfolio</div>

          <nav
            className="hidden sm:flex items-center gap-2"
            aria-label="Navigation sections"
          >
            {sections.map((s, idx) => {
              const isActive = idx === step;
              return (
                <button
                  key={s.id}
                  onClick={() => go(idx as Step)}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition',
                    'border-white/15 bg-white/5 hover:bg-white/10',
                    isActive ? 'bg-white/15 border-white/25' : '',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {s.label}
                </button>
              );
            })}
          </nav>

          <div className="text-xs text-white/70">
            {step + 1} / {sections.length}
          </div>
        </div>

        <nav
          className="sm:hidden mt-3 flex gap-2 overflow-x-auto pb-1"
          aria-label="Navigation sections mobile"
        >
          {sections.map((s, idx) => {
            const isActive = idx === step;
            return (
              <button
                key={s.id}
                onClick={() => go(idx as Step)}
                className={[
                  'shrink-0 rounded-full border px-3 py-1.5 text-sm transition',
                  'border-white/15 bg-white/5 hover:bg-white/10',
                  isActive ? 'bg-white/15 border-white/25' : '',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-60px)] w-full max-w-5xl grid-rows-[1fr_auto] px-4 sm:px-6 py-5">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="rounded-3xl border border-white/15 bg-white/5 p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            {active.node}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-4 flex items-center justify-between gap-3 pb-2">
          <button
            onClick={prev}
            disabled={step === 0}
            className={[
              'rounded-2xl border px-4 py-2 text-sm transition',
              'border-white/15 bg-white/5 hover:bg-white/10',
              step === 0
                ? 'opacity-40 cursor-not-allowed hover:bg-white/5'
                : '',
            ].join(' ')}
          >
            ← Précédent
          </button>

          <div
            className="flex items-center gap-2"
            aria-label="Indicateur de progression"
          >
            {sections.map((s, idx) => {
              const isActive = idx === step;
              return (
                <button
                  key={s.id}
                  onClick={() => go(idx as Step)}
                  className="p-2"
                  aria-label={`Aller à ${s.label}`}
                >
                  <span
                    className={[
                      'block h-2.5 w-2.5 rounded-full border transition',
                      isActive
                        ? 'bg-white border-white/40'
                        : 'bg-white/30 border-white/20',
                    ].join(' ')}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={next}
            disabled={step === 2}
            className={[
              'rounded-2xl border px-4 py-2 text-sm transition',
              'border-white/15 bg-white/5 hover:bg-white/10',
              step === 2
                ? 'opacity-40 cursor-not-allowed hover:bg-white/5'
                : '',
            ].join(' ')}
          >
            Suivant →
          </button>
        </footer>
      </section>
    </main>
  );
}
