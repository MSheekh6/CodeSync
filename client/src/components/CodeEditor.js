import Editor from '@monaco-editor/react';
import { useState } from 'react';

// SVG Icons for file types
const HtmlIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#E44D26">
    <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm5.266 7.302l-.173-2.035 7.533.002.173-1.963-9.87-.002.522 5.998h6.835l-.243 2.566-2.179.602-2.214-.605-.141-1.58H7.691l.247 3.123L12 17.506l4.028-1.08.558-6.111H9.402v-.001z"/>
  </svg>
);

const CssIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1572B6">
    <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm11.427 8.239l.194-2.035-7.533-.002-.173 1.963h5.266l-.243 2.566-2.179.602-2.214-.605-.141-1.58H6.596l.247 3.123L12 17.506l4.028-1.08.535-5.175z"/>
  </svg>
);

const JsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F7DF1E">
    <path d="M3 3h18v18H3V3zm4.73 15.04c.4.85 1.19 1.55 2.54 1.55 1.5 0 2.53-.75 2.53-2.42v-5.78h-1.7v5.72c0 .8-.28 1.01-.74 1.01-.49 0-.69-.39-.9-.8l-1.35.72h-.38zm5.98-.18c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#8892b0">
    <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
  </svg>
);

const PreviewIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#8892b0">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

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

  // File data with names and icon components
  const files = [
    { id: 'html', name: 'index.html', icon: <HtmlIcon /> },
    { id: 'css', name: 'style.css', icon: <CssIcon /> },
    { id: 'js', name: 'script.js', icon: <JsIcon /> },
  ];

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
      {/* Sidebar - File Explorer */}
      <div className="sidebar">
        <div className="sidebar-header">
          <FolderIcon />
          <span>Files</span>
        </div>
        <div className="file-list">
          {files.map((file) => (
            <div
              key={file.id}
              className={`file-item ${activeTab === file.id ? 'active' : ''}`}
              onClick={() => setActiveTab(file.id)}
            >
              <span className="file-icon">{file.icon}</span>
              <span className="file-name">{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Panel */}
      <div className="editor-panel">
        <div className="panel-header">
          <div className="open-tabs">
            {files.map((file) => (
              <div
                key={file.id}
                className={`open-tab ${activeTab === file.id ? 'active' : ''}`}
                onClick={() => setActiveTab(file.id)}
              >
                <span className="tab-icon">{file.icon}</span>
                <span>{file.name}</span>
              </div>
            ))}
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
              fontFamily: "'Fira Code', 'Consolas', monospace",
            }}
          />
        </div>
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <div className="panel-header">
          <PreviewIcon />
          <span>Preview</span>
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
