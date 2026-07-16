import { SectionCard } from '../../components/common/SectionCard';

export function AdminDashboardPage() {
  return (
    <div className="page-stack">
      <SectionCard
        eyebrow="Admin dashboard"
        title="Dense controls that still feel calm."
        description="The admin shell will support room inventory, bookings, pricing, and operational views."
      >
        <div className="dashboard-preview">
          <div>
            <p className="dashboard-preview__label">Operations</p>
            <ul>
              <li>Rooms</li>
              <li>Bookings</li>
              <li>Users</li>
            </ul>
          </div>
          <div>
            <p className="dashboard-preview__label">Controls</p>
            <ul>
              <li>Filters</li>
              <li>Tables</li>
              <li>Side panels</li>
            </ul>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}