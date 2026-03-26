import Link from "next/link";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "https://cal.com";

export default function ThankYouPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-5 py-16">
      <section className="surface-card w-full p-7 sm:p-10">
        <p className="font-heading text-xs tracking-[0.2em] text-benaa-muted uppercase">
          Submission Received
        </p>
        <h1 className="font-heading mt-3 text-3xl font-semibold text-benaa-ink sm:text-4xl">
          Thank You
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-benaa-muted sm:text-base">
          Your interest has been received. We will follow up with onboarding updates and
          next steps.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-ink bg-benaa-ink px-5 text-xs tracking-[0.09em] text-white uppercase transition hover:bg-[#172a5e]"
          >
            Back To Home
          </Link>
          <a
            href={calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-rule-strong px-5 text-xs tracking-[0.09em] text-benaa-ink uppercase transition hover:border-benaa-ink"
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </main>
  );
}
