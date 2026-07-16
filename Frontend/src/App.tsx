import { AppShell } from './components/common/AppShell';
import { AppRouter } from './routes/AppRouter';
import { adminNav, guestNav, publicNav } from './routes/navigation';

const allNavLinks = [...publicNav, ...guestNav, ...adminNav];

export default function App() {
  return (
    <AppShell
      brand="EasyStay"
      subtitle="Hotel reservations, redesigned as a clean product experience."
      links={allNavLinks}
    >
      <AppRouter />
    </AppShell>
  );
}