type FeatureCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  items: string[];
};

export function FeatureCard({ eyebrow, title, description, accent, items }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <div className="feature-card__accent" style={{ background: accent }} />
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p className="feature-card__description">{description}</p>
      <ul className="feature-card__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}