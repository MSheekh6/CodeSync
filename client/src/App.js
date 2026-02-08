import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>CodeSync</h1>
      </header>
      <main className="main-content">
        <CodeEditor />
      </main>
    </div>
  );
}

export default App;
