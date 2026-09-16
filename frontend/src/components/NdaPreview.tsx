import { NdaFormData } from "@/types/nda";
import { buildDisplayValues } from "@/lib/nda-format";
import { NDA_SOURCE_ATTRIBUTION, NDA_STANDARD_TERMS } from "@/lib/nda-content";
import FilledText from "@/components/FilledText";

interface NdaPreviewProps {
  data: NdaFormData;
}

function partyDisplay(value: string, placeholder: string) {
  return value.trim() || placeholder;
}

export default function NdaPreview({ data }: NdaPreviewProps) {
  const values = buildDisplayValues(data);

  return (
    <div
      id="nda-preview"
      className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-800 p-8 space-y-8 leading-relaxed"
    >
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-bold">Mutual Non-Disclosure Agreement</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cover Page &amp; Standard Terms
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-base font-semibold border-b border-slate-200 dark:border-slate-800 pb-1">
          Cover Page
        </h2>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Purpose
            </dt>
            <dd>
              <FilledText text="{{PURPOSE}}" values={values} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Effective Date
            </dt>
            <dd>
              <FilledText text="{{EFFECTIVE_DATE}}" values={values} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              MNDA Term
            </dt>
            <dd>
              <FilledText text="{{MNDA_TERM}}" values={values} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Term of Confidentiality
            </dt>
            <dd>
              <FilledText text="{{CONFIDENTIALITY_TERM}}" values={values} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Governing Law
            </dt>
            <dd>
              <FilledText text="{{GOVERNING_LAW}}" values={values} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Jurisdiction
            </dt>
            <dd>
              <FilledText text="{{JURISDICTION}}" values={values} />
            </dd>
          </div>
        </dl>

        {data.modifications.trim() && (
          <div className="text-sm">
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              MNDA Modifications
            </dt>
            <dd className="whitespace-pre-wrap">{data.modifications}</dd>
          </div>
        )}

        <table className="w-full text-sm border-collapse mt-4">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 py-1"></th>
              <th className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 py-1">
                Party 1
              </th>
              <th className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 py-1">
                Party 2
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Print Name", "printName", "[Print name]"],
              ["Title", "title", "[Title]"],
              ["Company", "company", "[Company]"],
              ["Notice Address", "noticeAddress", "[Notice address]"],
            ].map(([label, key, placeholder]) => (
              <tr key={key}>
                <td className="py-1.5 pr-2 text-slate-500 dark:text-slate-400 align-top">
                  {label}
                </td>
                <td className="py-1.5 pr-2 align-top whitespace-pre-wrap">
                  {partyDisplay(
                    data.partyOne[key as keyof typeof data.partyOne],
                    placeholder
                  )}
                </td>
                <td className="py-1.5 align-top whitespace-pre-wrap">
                  {partyDisplay(
                    data.partyTwo[key as keyof typeof data.partyTwo],
                    placeholder
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold border-b border-slate-200 dark:border-slate-800 pb-1">
          Standard Terms
        </h2>
        <ol className="space-y-4 text-sm list-decimal list-outside pl-5">
          {NDA_STANDARD_TERMS.map((clause) => (
            <li key={clause.title}>
              <span className="font-semibold">{clause.title}. </span>
              <FilledText text={clause.body} values={values} />
            </li>
          ))}
        </ol>
      </section>

      <footer className="text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-3">
        {NDA_SOURCE_ATTRIBUTION}
      </footer>
    </div>
  );
}
