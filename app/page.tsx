import Image from "next/image";
import { WaitlistProvider } from "@/components/waitlist-context";
import { WaitlistButton } from "@/components/waitlist-button";
import { WaitlistModal } from "@/components/waitlist-modal";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "https://cal.com";

const problemCards = [
  {
    title: "The Problem",
    copy: "Sourcing modular partners is still opaque, relationship-driven, and manual across most projects.",
  },
  {
    title: "The Difference",
    copy: "BENAA introduces structured discovery, side-by-side comparison, and more consistent vetting.",
  },
  {
    title: "Why Join Early",
    copy: "Early members help shape onboarding logic, factory coverage, and procurement workflows from day one.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Post Project Requirements",
    copy: "Submit your project constraints, timing, and production needs in a structured format.",
  },
  {
    step: "02",
    title: "Match And Vet Factories",
    copy: "BENAA surfaces relevant modular factory partners and applies standardized vetting logic.",
  },
  {
    step: "03",
    title: "Compare And Engage",
    copy: "Review profiles, evaluate fit, and connect with the right partners with less friction.",
  },
];

const sharedPrimaryCtaClass =
  "font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-ink bg-benaa-ink px-5 text-xs tracking-[0.09em] text-white uppercase transition hover:bg-[#172a5e]";

const sharedSecondaryCtaClass =
  "font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-rule-strong px-5 text-xs tracking-[0.09em] text-benaa-ink uppercase transition hover:border-benaa-ink";

const year = new Date().getFullYear();

export default function Home() {
  return (
    <WaitlistProvider>
      <div className="min-h-screen pb-20 md:pb-0">
        <div className="mx-auto max-w-6xl border-x border-benaa-rule">
          <header className="sticky top-0 z-40 border-b border-benaa-rule bg-benaa-bg/94 backdrop-blur">
            <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-7 lg:h-36">
              <a href="#top" className="block">
                <Image
                  src="/Benaalogo_0A1638_upscaled_4x.png"
                  alt="BENAA"
                  width={440}
                  height={112}
                  priority
                  className="h-8 w-auto origin-left sm:h-10 md:h-12 lg:h-32 lg:scale-200 lg:translate-y-6"
                />
              </a>
              <nav className="hidden items-center gap-3 sm:flex">
                <a
                  href={calLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sharedSecondaryCtaClass}
                >
                  Let&apos;s Talk
                </a>
                <WaitlistButton className={sharedPrimaryCtaClass} />
              </nav>
            </div>
          </header>

          <main id="top">
            <section className="section-rule border-b border-benaa-rule px-5 py-14 sm:px-7 sm:py-20">
              <div className="max-w-3xl">
                <p className="font-heading text-xs tracking-[0.2em] text-benaa-muted uppercase">
                  Infrastructure For Modular Procurement
                </p>
                <h1 className="font-heading mt-4 text-4xl leading-tight font-semibold text-benaa-ink sm:text-5xl">
                  The Procurement OS for Modular Construction.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-benaa-muted">
                  BENAA helps developers, contractors, and modular factories discover, vet,
                  compare, and engage through a structured procurement workflow.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WaitlistButton className={sharedPrimaryCtaClass} />
                  <a
                    href={calLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sharedSecondaryCtaClass}
                  >
                    Let&apos;s Talk
                  </a>
                </div>
              </div>
            </section>

            <section className="border-b border-benaa-rule px-5 py-14 sm:px-7 sm:py-16">
              <div className="mb-8 max-w-3xl">
                <h2 className="font-heading mt-3 text-3xl font-semibold text-benaa-ink sm:text-4xl">
                  Built For Real Procurement Workflows.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {problemCards.map((card) => (
                  <article key={card.title} className="surface-card p-5">
                    <h3 className="font-heading text-lg font-semibold text-benaa-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-benaa-muted">{card.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-b border-benaa-rule px-5 py-14 sm:px-7 sm:py-16">
              <div className="mb-8 max-w-3xl">
                <p className="font-heading text-xs tracking-[0.18em] text-benaa-muted uppercase">
                  How It Works
                </p>
                <h2 className="font-heading mt-3 text-3xl font-semibold text-benaa-ink sm:text-4xl">
                  Structured In Three Steps.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {workflowSteps.map((step) => (
                  <article key={step.step} className="surface-card p-5">
                    <p className="font-heading text-xs tracking-[0.16em] text-benaa-muted uppercase">
                      Step {step.step}
                    </p>
                    <h3 className="font-heading mt-2 text-lg font-semibold text-benaa-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-benaa-muted">{step.copy}</p>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <footer className="px-5 py-4 sm:px-7 sm:py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Image
                  src="/Benaalogo_0A1638_upscaled_4x.png"
                  alt="BENAA"
                  width={440}
                  height={112}
                  className="h-14 w-auto sm:h-16"
                />
                <p className="mt-1 text-sm text-benaa-muted">
                  Procurement infrastructure for modular construction.
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href="#top"
                  className="font-heading inline-flex h-9 items-center justify-center rounded-[10px] border border-benaa-rule-strong px-4 text-[11px] tracking-[0.09em] text-benaa-ink uppercase transition hover:border-benaa-ink"
                >
                  Back To Top
                </a>
              </div>
            </div>
            <p className="mt-3 border-t border-benaa-rule pt-2 text-xs text-benaa-muted">
              {year} BENAA. All rights reserved.
            </p>
          </footer>
        </div>

        <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-benaa-rule bg-benaa-bg/97 p-3 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-6xl items-center gap-2">
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[10px] border border-benaa-rule-strong px-2 text-[11px] tracking-[0.08em] text-benaa-ink uppercase"
            >
              Let&apos;s Talk
            </a>
            <WaitlistButton
              className="font-heading inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-[10px] border border-benaa-ink bg-benaa-ink px-2 text-[11px] tracking-[0.08em] text-white uppercase"
            />
          </div>
        </div>
      </div>
      <WaitlistModal calLink={calLink} />
    </WaitlistProvider>
  );
}
