import type { ReactNode } from 'react';

type SectionCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function SectionCard({ eyebrow, title, description, children }: SectionCardProps) {
  return (
    <section className="section">
      <div className="section__header">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="section__description">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}