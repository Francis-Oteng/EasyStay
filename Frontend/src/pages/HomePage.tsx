import { FeatureCard } from '../components/FeatureCard';
import { SectionCard } from '../components/common/SectionCard';
import { productSections } from '../routes/navigation';

const metrics = [
  { label: 'Routes planned', value: 'Public, guest, admin' },
  { label: 'UI direction', value: 'Minimal product UI' },
  { label: 'Build status', value: 'Scaffold ready' },
];

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">EasyStay frontend scaffold</p>
          <h1>Design the booking platform around clarity, speed, and trust.</h1>
          <p className="hero__lead">
            The first routed pass establishes the app shell, visual system, and the three main product zones so the
            experience can grow into a complete hotel workflow.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="/rooms">
              Explore rooms
            </a>
            <a className="button button--secondary" href="/admin">
              Review admin surface
            </a>
          </div>
        </div>

        <aside className="hero__panel" aria-label="Implementation summary">
          <div className="hero__panel-header">
            <span className="status-dot" />
            <span>Initial design system</span>
          </div>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <div className="hero__note">
            <p>
              The current repo exposed a scaffold, so the implementation starts by creating a real app shell and
              route structure instead of patching individual screens.
            </p>
          </div>
        </aside>
      </section>

      <SectionCard
        eyebrow="Product zones"
        title="One system, three workflows."
        description="The layout and interaction model should stay consistent while each zone gets the density it needs."
      >
        <div className="feature-grid">
          {productSections.map((card, index) => (
            <FeatureCard
              key={card.title}
              eyebrow={card.title}
              title={card.description}
              description=""
              accent={index === 0 ? 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)' : index === 1 ? 'linear-gradient(135deg, #111827 0%, #14b8a6 100%)' : 'linear-gradient(135deg, #111827 0%, #f97316 100%)'}
              items={card.items}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}