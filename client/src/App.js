import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L4 8L8 12" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 4L20 8L16 12" stroke="#6c9eff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 4L10 20" stroke="#4a5568" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="18" cy="18" r="4" fill="#6c9eff" opacity="0.3"/>
            <circle cx="18" cy="18" r="2" fill="#6c9eff"/>
          </svg>
        </div>
        <h1>CodeSync</h1>
        <span className="header-tagline">Real-time Collaborative Editor</span>
      </header>
      <main className="main-content">
        <CodeEditor />
      </main>
    </div>
  );
}

export default App;
