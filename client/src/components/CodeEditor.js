import Editor from '@monaco-editor/react';
import { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f0f0f0;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Start editing to see the preview update.</p>
</body>
</html>`);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div className="editor-layout">
      {/* Editor Panel */}
      <div className="editor-panel">
        <div className="panel-header">
          <span>Code Editor</span>
        </div>
        <div className="editor-container">
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={code}
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
            srcDoc={code}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
