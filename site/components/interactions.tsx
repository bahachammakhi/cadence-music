"use client";
import { useEffect, useRef, useState } from "react";
import { repo } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    if (open && !el?.open) el?.showModal();
    else if (!open && el?.open) el.close();
  }, [open]);
  return (
    <>
      <button
        className="menu-toggle"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
      </button>
      <dialog
        id="mobile-navigation"
        ref={dialog}
        onClose={() => setOpen(false)}
        className="mobile-dialog"
      >
        <button
          className="menu-close"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          ×
        </button>
        <nav aria-label="Mobile navigation">
          {[
            ["The experience", "#experience"],
            ["How it works", "#setup"],
            ["Compatibility", "#compatibility"],
            ["Questions", "#questions"],
            ["View on GitHub", repo],
          ].map(([text, href], i) => (
            <a
              key={text}
              href={href}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setOpen(false)}
            >
              {text}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
}

export function ScrollEffects() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      const box = el.getBoundingClientRect();
      if (box.top > window.innerHeight) {
        el.classList.add("will-reveal");
        observer.observe(el);
      }
    });
    const words = document.querySelectorAll(".tagline-word");
    const wordObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("word-visible");
            wordObserver.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -18% 0px", threshold: 1 },
    );
    words.forEach((word, index) => {
      (word as HTMLElement).style.transitionDelay = `${index * 80}ms`;
      word.classList.add("word-pending");
      wordObserver.observe(word);
    });
    return () => {
      observer.disconnect();
      wordObserver.disconnect();
    };
  }, []);
  return null;
}
