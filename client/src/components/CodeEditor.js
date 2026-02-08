import Editor from '@monaco-editor/react';
import { useState } from 'react';

function CodeEditor() {
  const [code, setCode] = useState('<!-- Start coding here -->\n<h1>Hello World</h1>');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
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
  );
}

export default CodeEditor;
