"use client";

import { NdaFormData, PartyInfo } from "@/types/nda";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
const labelClass =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1";
const sectionTitleClass =
  "text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3";

function PartyFields({
  legend,
  party,
  onChange,
}: {
  legend: string;
  party: PartyInfo;
  onChange: (party: PartyInfo) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className={sectionTitleClass}>{legend}</legend>
      <div>
        <label className={labelClass}>Print Name</label>
        <input
          className={inputClass}
          value={party.printName}
          onChange={(e) => onChange({ ...party, printName: e.target.value })}
          placeholder="Jordan Lee"
        />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input
          className={inputClass}
          value={party.title}
          onChange={(e) => onChange({ ...party, title: e.target.value })}
          placeholder="VP, Business Development"
        />
      </div>
      <div>
        <label className={labelClass}>Company</label>
        <input
          className={inputClass}
          value={party.company}
          onChange={(e) => onChange({ ...party, company: e.target.value })}
          placeholder="Acme, Inc."
        />
      </div>
      <div>
        <label className={labelClass}>Notice Address</label>
        <textarea
          className={inputClass}
          rows={2}
          value={party.noticeAddress}
          onChange={(e) =>
            onChange({ ...party, noticeAddress: e.target.value })
          }
          placeholder="legal@acme.com or 123 Main St, Wilmington, DE"
        />
      </div>
    </fieldset>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <PartyFields
          legend="Party 1"
          party={data.partyOne}
          onChange={(partyOne) => onChange({ ...data, partyOne })}
        />
        <PartyFields
          legend="Party 2"
          party={data.partyTwo}
          onChange={(partyTwo) => onChange({ ...data, partyTwo })}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className={sectionTitleClass}>Deal Terms</legend>

        <div>
          <label className={labelClass}>Purpose</label>
          <textarea
            className={inputClass}
            rows={2}
            value={data.purpose}
            onChange={(e) => onChange({ ...data, purpose: e.target.value })}
          />
        </div>

        <div>
          <label className={labelClass}>Effective Date</label>
          <input
            type="date"
            className={inputClass}
            value={data.effectiveDate}
            onChange={(e) =>
              onChange({ ...data, effectiveDate: e.target.value })
            }
          />
        </div>

        <div>
          <label className={labelClass}>MNDA Term</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="mndaTermType"
                checked={data.mndaTermType === "expires"}
                onChange={() => onChange({ ...data, mndaTermType: "expires" })}
              />
              Expires
              <input
                type="number"
                min={1}
                className="w-16 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm"
                value={data.mndaTermYears}
                onChange={(e) =>
                  onChange({
                    ...data,
                    mndaTermType: "expires",
                    mndaTermYears: Math.max(1, Number(e.target.value) || 1),
                  })
                }
              />
              year(s) from Effective Date
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="mndaTermType"
                checked={data.mndaTermType === "until-terminated"}
                onChange={() =>
                  onChange({ ...data, mndaTermType: "until-terminated" })
                }
              />
              Continues until terminated
            </label>
          </div>
        </div>

        <div>
          <label className={labelClass}>Term of Confidentiality</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="confidentialityTermType"
                checked={data.confidentialityTermType === "years"}
                onChange={() =>
                  onChange({ ...data, confidentialityTermType: "years" })
                }
              />
              <input
                type="number"
                min={1}
                className="w-16 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm"
                value={data.confidentialityTermYears}
                onChange={(e) =>
                  onChange({
                    ...data,
                    confidentialityTermType: "years",
                    confidentialityTermYears: Math.max(
                      1,
                      Number(e.target.value) || 1
                    ),
                  })
                }
              />
              year(s) from Effective Date (trade secrets survive longer)
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="radio"
                name="confidentialityTermType"
                checked={data.confidentialityTermType === "perpetuity"}
                onChange={() =>
                  onChange({ ...data, confidentialityTermType: "perpetuity" })
                }
              />
              In perpetuity
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Governing Law (State)</label>
            <input
              className={inputClass}
              value={data.governingLaw}
              onChange={(e) =>
                onChange({ ...data, governingLaw: e.target.value })
              }
              placeholder="Delaware"
            />
          </div>
          <div>
            <label className={labelClass}>Jurisdiction</label>
            <input
              className={inputClass}
              value={data.jurisdiction}
              onChange={(e) =>
                onChange({ ...data, jurisdiction: e.target.value })
              }
              placeholder="New Castle, DE"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            MNDA Modifications <span className="normal-case">(optional)</span>
          </label>
          <textarea
            className={inputClass}
            rows={2}
            value={data.modifications}
            onChange={(e) =>
              onChange({ ...data, modifications: e.target.value })
            }
            placeholder="List any modifications to the Standard Terms"
          />
        </div>
      </fieldset>
    </div>
  );
}
