"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  PHONE_TEL,
  PHONE_TEL_2,
  WHATSAPP_URL,
} from "@/lib/site";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

function Field({
  name,
  label,
  type = "text",
  value,
  required,
  textarea,
  rows = 4,
  onChange,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  const floating = focused || filled;

  const common = {
    name,
    value,
    onChange,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className:
      "peer w-full bg-transparent border-0 border-b border-border pb-2 pt-6 text-ink text-base outline-none focus:border-ink transition-colors duration-300 placeholder-transparent",
    placeholder: label,
  } as const;

  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-mono uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] tracking-[0.18em] ${
          floating
            ? "top-0 text-[9px] text-accent"
            : "top-7 text-[11px] text-ink-3"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          {...common}
          id={name}
          rows={rows}
          className={`${common.className} resize-none`}
        />
      ) : (
        <input {...common} id={name} type={type} />
      )}
      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-[2px] origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          focused ? "scale-x-100 w-full" : "scale-x-0 w-full"
        }`}
      />
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-paper border-t border-border py-24 md:py-32"
    >
      <div className="mx-auto max-w-[100rem] px-6">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left: heading + direct contact channels */}
          <div className="md:col-span-5">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 mb-6">
                {t("sectionLabel")}
              </p>
              <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-ink text-balance">
                <SplitText
                  text={t("title")}
                  by="words"
                  stagger={0.07}
                  className="block"
                />
              </h2>
              <p className="mt-6 text-ink-2 max-w-md leading-relaxed">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 space-y-4 max-w-md">
                <a
                  href={CONTACT_MAILTO}
                  className="group flex items-center gap-4 border border-border rounded-2xl px-5 py-4 hover:border-accent transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0 group-hover:bg-accent group-hover:text-paper transition-colors duration-200">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-0.5">
                      {t("channelEmail")}
                    </p>
                    <p className="text-sm font-medium text-ink truncate">
                      {CONTACT_EMAIL}
                    </p>
                  </div>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border border-border rounded-2xl px-5 py-4 hover:border-accent transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0 group-hover:bg-accent group-hover:text-paper transition-colors duration-200">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-0.5">
                      {t("channelWhatsapp")}
                    </p>
                    <p className="text-sm font-medium text-ink">
                      +962 79 544 1474
                    </p>
                  </div>
                </a>

                <a
                  href={PHONE_TEL}
                  className="group flex items-center gap-4 border border-border rounded-2xl px-5 py-4 hover:border-accent transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0 group-hover:bg-accent group-hover:text-paper transition-colors duration-200">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-0.5">
                      {t("channelCall")}
                    </p>
                    <p className="text-sm font-medium text-ink">
                      +962 79 544 1474
                    </p>
                  </div>
                </a>

                <a
                  href={PHONE_TEL_2}
                  className="group flex items-center gap-4 border border-border rounded-2xl px-5 py-4 hover:border-accent transition-colors duration-200"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0 group-hover:bg-accent group-hover:text-paper transition-colors duration-200">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4 mb-0.5">
                      {t("channelCall")}
                    </p>
                    <p className="text-sm font-medium text-ink">
                      +962 79 065 4555
                    </p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.1}>
              <div className="relative">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-start gap-5 border-t border-accent pt-14"
                    >
                      <CheckCircle2
                        className="h-12 w-12 text-accent"
                        strokeWidth={1.5}
                      />
                      <h3 className="text-2xl font-semibold text-ink">
                        {t("success")}
                      </h3>
                      <p className="text-sm text-ink-3 max-w-md">
                        {t("successBody")}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid gap-8 sm:grid-cols-2">
                        <Field
                          name="name"
                          label={t("name")}
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                        <Field
                          name="email"
                          label={t("email")}
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Field
                        name="company"
                        label={t("company")}
                        value={form.company}
                        onChange={handleChange}
                      />
                      <Field
                        name="message"
                        label={t("message")}
                        value={form.message}
                        onChange={handleChange}
                        required
                        textarea
                        rows={4}
                      />

                      {status === "error" && (
                        <p className="text-sm text-accent font-mono uppercase tracking-widest">
                          {t("error")}
                        </p>
                      )}

                      <div className="pt-6 border-t border-border">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          data-cursor="Send"
                          className="group relative inline-flex items-center justify-between gap-6 w-full md:w-auto px-8 py-5 rounded-full bg-ink text-paper font-semibold transition-all duration-300 hover:bg-accent disabled:opacity-50 overflow-hidden"
                        >
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
                            {status === "loading" ? t("sending") : t("send")}
                          </span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
