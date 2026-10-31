import { Link } from 'react-router-dom';

function DashboardPage() {
  return <div className="placeholder-page"><span className="eyebrow">Dashboard</span><h1>Your projects will live here.</h1><p>Accounts and saved projects are planned for a later step.</p><Link className="button button-primary" to="/">Explore CodeSync</Link></div>;
}

export default DashboardPage;
