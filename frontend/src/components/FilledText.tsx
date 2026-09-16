import { Fragment } from "react";
import { NdaDisplayValues } from "@/lib/nda-format";

const TOKEN_PATTERN = /\*\*(.+?)\*\*|\{\{(\w+)\}\}/g;

interface FilledTextProps {
  text: string;
  values: NdaDisplayValues;
}

export default function FilledText({ text, values }: FilledTextProps) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }

    const [, boldContent, tokenName] = match;
    if (boldContent !== undefined) {
      nodes.push(<strong key={key++}>{boldContent}</strong>);
    } else if (tokenName) {
      const value = values[tokenName as keyof NdaDisplayValues];
      const isPlaceholder = typeof value === "string" && value.startsWith("[");
      nodes.push(
        <span
          key={key++}
          className={
            isPlaceholder
              ? "text-amber-700 dark:text-amber-400 italic"
              : "font-medium text-slate-900 dark:text-slate-100 underline decoration-dotted underline-offset-2"
          }
        >
          {value}
        </span>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{nodes}</>;
}
