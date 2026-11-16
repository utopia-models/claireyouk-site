"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setErr("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || "The message could not be sent.");
      setState("sent");
      form.reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : "The message could not be sent.");
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate={false}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" />
        </label>
      </div>
      <label className="field">
        <span>Organization <em>(optional)</em></span>
        <input name="organization" maxLength={160} autoComplete="organization" />
      </label>
      <label className="field">
        <span>Subject</span>
        <input name="subject" required maxLength={160} />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" required rows={5} maxLength={5000} />
      </label>
      {/* honeypot: people never see or fill this */}
      <label className="hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="form-foot">
        <button className="btn btn-light" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        <AnimatePresence mode="wait">
          {state === "sent" && (
            <motion.p key="ok" className="form-note ok" role="status" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              Thank you. Your message is on its way to Claire.
            </motion.p>
          )}
          {state === "error" && (
            <motion.p key="err" className="form-note err" role="alert" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {err} You can also email law@claireyouk.com.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
