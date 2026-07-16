import { SectionCard } from '../components/common/SectionCard';

export function NotFoundPage() {
  return (
    <div className="page-stack">
      <SectionCard eyebrow="404" title="Page not found" description="Use the top-level routes to continue exploring the scaffold.">
        <a className="button button--primary" href="/">
          Back to home
        </a>
      </SectionCard>
    </div>
  );
}