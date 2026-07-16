import { SectionCard } from '../../components/common/SectionCard';

export function BookingCheckoutPage() {
  return (
    <div className="page-stack">
      <SectionCard
        eyebrow="Public booking"
        title="Complete a booking in a calm, step-based flow."
        description="This route is reserved for review, payment, and confirmation states."
      >
        <div className="callout">
          <p>Next step: wire a summary panel, payment form, and confirmation state to this route.</p>
        </div>
      </SectionCard>
    </div>
  );
}