import { SectionCard } from '../../components/common/SectionCard';

export function RoomsPage() {
  return (
    <div className="page-stack">
      <SectionCard
        eyebrow="Public booking"
        title="Search and compare available rooms."
        description="This placeholder screen establishes the structure for filters, room cards, and availability states."
      >
        <div className="dashboard-preview">
          <div>
            <p className="dashboard-preview__label">Planned UI</p>
            <ul>
              <li>Search controls</li>
              <li>Room cards</li>
              <li>Availability badges</li>
            </ul>
          </div>
          <div>
            <p className="dashboard-preview__label">Next data hooks</p>
            <ul>
              <li>Date range</li>
              <li>Guests and occupancy</li>
              <li>Price and type filters</li>
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}