"use client";

import { useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import { defaultNdaFormData, NdaFormData } from "@/types/nda";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Home() {
  const [data, setData] = useState<NdaFormData>(defaultNdaFormData);

  const partySlug =
    slugify(data.partyOne.company || data.partyOne.printName) &&
    slugify(data.partyTwo.company || data.partyTwo.printName)
      ? `${slugify(
          data.partyOne.company || data.partyOne.printName
        )}-${slugify(data.partyTwo.company || data.partyTwo.printName)}`
      : "mutual-nda";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Mutual NDA Creator
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in the details below to generate a Mutual Non-Disclosure
              Agreement.
            </p>
          </div>
          <DownloadPdfButton
            targetId="nda-preview"
            fileName={`${partySlug}-mutual-nda.pdf`}
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 h-fit lg:sticky lg:top-8">
          <NdaForm data={data} onChange={setData} />
        </section>

        <section>
          <NdaPreview data={data} />
        </section>
      </main>
    </div>
  );
}
