import { Link } from 'react-router-dom';

function NotFoundPage() {
  return <div className="placeholder-page"><span className="eyebrow">404</span><h1>That page moved.</h1><p>Try heading back to the CodeSync home page.</p><Link className="button button-primary" to="/">Back home</Link></div>;
}

export default NotFoundPage;
