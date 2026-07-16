import { SectionCard } from '../../components/common/SectionCard';

export function GuestHomePage() {
  return (
    <div className="page-stack">
      <SectionCard
        eyebrow="Guest account"
        title="Reservation management at a glance."
        description="Guests will use this area to track upcoming stays, payment states, and account actions."
      >
        <div className="dashboard-preview">
          <div>
            <p className="dashboard-preview__label">Status areas</p>
            <ul>
              <li>Upcoming</li>
              <li>Completed</li>
              <li>Canceled</li>
            </ul>
          </div>
          <div>
            <p className="dashboard-preview__label">Profile actions</p>
            <ul>
              <li>Contact details</li>
              <li>Password update</li>
              <li>Payment methods</li>
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}