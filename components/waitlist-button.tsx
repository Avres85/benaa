"use client";

import { useWaitlistModal } from "@/components/waitlist-context";

type WaitlistButtonProps = {
  className: string;
};

export function WaitlistButton({ className }: WaitlistButtonProps) {
  const { openModal } = useWaitlistModal();

  return (
    <button type="button" onClick={openModal} className={className}>
      Join Waitlist
    </button>
  );
}
