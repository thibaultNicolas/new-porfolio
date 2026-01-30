"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/utils/animations";

export function Contact() {
  const t = useTranslations("contact");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = async () => {
    const email = "contact@nicolasthibault.com";
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="section-padding bg-off-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center space-y-8"
        >
          {/* Header */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-black">
              {t("title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleEmailClick}
            >
              {emailCopied ? t("emailCopied") : t("copyEmail")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              as="a"
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
            <Button
              variant="secondary"
              size="lg"
              as="a"
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 pt-8">
            {t("available")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
