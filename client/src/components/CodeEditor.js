import Editor from '@monaco-editor/react';
import { useState } from 'react';

function CodeEditor() {
  // Separate state for each language
  const [html, setHtml] = useState(`<h1>Hello World!</h1>
<p>Start editing to see the preview update.</p>
<button onclick="sayHello()">Click Me</button>`);

  const [css, setCss] = useState(`body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}`);

  const [js, setJs] = useState(`function sayHello() {
  alert('Hello from CodeSync!');
}`);

  // Track active tab
  const [activeTab, setActiveTab] = useState('html');

  // Get current code based on active tab
  const getCode = () => {
    switch (activeTab) {
      case 'html': return html;
      case 'css': return css;
      case 'js': return js;
      default: return html;
    }
  };

  // Get language for Monaco
  const getLanguage = () => {
    switch (activeTab) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      default: return 'html';
    }
  };

  // Handle code changes
  const handleEditorChange = (value) => {
    switch (activeTab) {
      case 'html': setHtml(value); break;
      case 'css': setCss(value); break;
      case 'js': setJs(value); break;
      default: break;
    }
  };

  // Combine all code for preview
  const getPreviewCode = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>`;
  };

  return (
    <div className="editor-layout">
      {/* Editor Panel */}
      <div className="editor-panel">
        <div className="panel-header">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'html' ? 'active' : ''}`}
              onClick={() => setActiveTab('html')}
            >
              HTML
            </button>
            <button
              className={`tab ${activeTab === 'css' ? 'active' : ''}`}
              onClick={() => setActiveTab('css')}
            >
              CSS
            </button>
            <button
              className={`tab ${activeTab === 'js' ? 'active' : ''}`}
              onClick={() => setActiveTab('js')}
            >
              JS
            </button>
          </div>
        </div>
        <div className="editor-container">
          <Editor
            height="100%"
            language={getLanguage()}
            theme="vs-dark"
            value={getCode()}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <div className="panel-header">
          <span>Live Preview</span>
        </div>
        <div className="preview-container">
          <iframe
            title="preview"
            srcDoc={getPreviewCode()}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
