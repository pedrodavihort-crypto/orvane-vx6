import { Fragment, type ElementType } from 'react';

interface Props {
  /** Uma string, ou um array de linhas */
  text: string | readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  wordClassName?: string;
}

/**
 * Renderiza texto já dividido em palavras mascaradas (.word > .word-inner),
 * sem manipular o DOM depois do render. O texto completo fica disponível para leitores de tela.
 */
export function SplitWords({ text, as: Tag = 'span', className, lineClassName = 'block', wordClassName }: Props) {
  const lines = typeof text === 'string' ? [text] : text;
  const label = lines.join(' ');
  return (
    <Tag className={className} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} className={lineClassName} aria-hidden="true">
          {line.split(' ').map((w, wi, arr) => (
            <Fragment key={wi}>
              <span className="word">
                <span className={`word-inner ${wordClassName ?? ''}`}>{w}</span>
              </span>
              {wi < arr.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
