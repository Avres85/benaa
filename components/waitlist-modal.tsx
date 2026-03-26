"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useWaitlistModal } from "@/components/waitlist-context";

type WaitlistModalProps = {
  calLink: string;
};

type WaitlistFormState = {
  name: string;
  email: string;
  companyPosition: string;
};

const initialForm: WaitlistFormState = {
  name: "",
  email: "",
  companyPosition: "",
};

export function WaitlistModal({ calLink }: WaitlistModalProps) {
  const router = useRouter();
  const { isOpen, closeModal } = useWaitlistModal();
  const [form, setForm] = useState<WaitlistFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, closeModal]);

  const isDisabled = useMemo(
    () =>
      isSubmitting ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.companyPosition.trim(),
    [form, isSubmitting]
  );

  const resetAndClose = () => {
    setForm(initialForm);
    setErrorMessage(null);
    setIsSubmitting(false);
    closeModal();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setErrorMessage(payload?.error ?? "Submission failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setForm(initialForm);
      setIsSubmitting(false);
      closeModal();
      router.push("/thank-you");
    } catch {
      setErrorMessage("Unable to submit right now. Please try again shortly.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <button
        type="button"
        aria-label="Close waitlist form"
        className="fixed inset-0 bg-[#0f1d44]/45"
        onClick={resetAndClose}
      />
      <div className="relative z-10 flex min-h-full items-start justify-center p-4 sm:items-center">
        <div className="surface-card w-full max-w-xl p-6 shadow-[0_18px_50px_rgba(15,29,68,0.15)] sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-benaa-rule pb-4">
          <div>
            <p className="font-heading text-xs tracking-[0.18em] text-benaa-muted uppercase">
              BENAA Waitlist
            </p>
            <h2 className="font-heading mt-2 text-2xl font-semibold text-benaa-ink">
              Join Waitlist
            </h2>
            <p className="mt-2 text-sm leading-6 text-benaa-muted">
              Share your details and we will follow up with priority onboarding updates.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="rounded-[10px] border border-benaa-rule px-3 py-1.5 text-sm text-benaa-muted transition hover:border-benaa-rule-strong hover:text-benaa-ink"
          >
            Close
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="font-heading mb-1.5 block text-xs tracking-[0.14em] text-benaa-muted uppercase">
              Name
            </span>
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-[10px] border border-benaa-rule bg-benaa-surface px-3 py-2.5 text-sm text-benaa-ink outline-none transition focus:border-benaa-rule-strong"
              placeholder="Full name"
            />
          </label>

          <label className="block">
            <span className="font-heading mb-1.5 block text-xs tracking-[0.14em] text-benaa-muted uppercase">
              Email
            </span>
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-[10px] border border-benaa-rule bg-benaa-surface px-3 py-2.5 text-sm text-benaa-ink outline-none transition focus:border-benaa-rule-strong"
              placeholder="you@company.com"
            />
          </label>

          <label className="block">
            <span className="font-heading mb-1.5 block text-xs tracking-[0.14em] text-benaa-muted uppercase">
              Company / Position
            </span>
            <input
              required
              value={form.companyPosition}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  companyPosition: event.target.value,
                }))
              }
              className="w-full rounded-[10px] border border-benaa-rule bg-benaa-surface px-3 py-2.5 text-sm text-benaa-ink outline-none transition focus:border-benaa-rule-strong"
              placeholder="Company and role"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-[10px] border border-[#b73f55] bg-[#fff3f5] px-3 py-2 text-sm text-[#8d1e35]">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-benaa-rule pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={isDisabled}
              className="font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-ink bg-benaa-ink px-5 text-sm tracking-[0.08em] text-white uppercase transition hover:bg-[#172a5e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </button>
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading inline-flex h-11 items-center justify-center rounded-[10px] border border-benaa-rule-strong px-5 text-sm tracking-[0.08em] text-benaa-ink uppercase transition hover:border-benaa-ink"
            >
              Let&apos;s Talk
            </a>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
