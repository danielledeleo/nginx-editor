import React, { useEffect } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';
import { nginxStr } from './nginx.conf';
import Header from './Header';
import './App.css';
import '../';

const App: React.FC = () => {
  const editor = React.useRef<MonacoEditor>();
  function resizeHandle(evn: UIEvent) {
    const { target } = evn;
    const width = (target as Window).innerWidth;
    const height = (target as Window).innerHeight;
    if (editor.current && editor.current.editor) {
      editor.current.editor.layout({ width, height: height - 36 })
    }
  }
  useEffect(() => {
    if (editor.current && editor.current.editor && window) {
      window.addEventListener('resize', resizeHandle, false);
    }
    return () => {
      window && window.removeEventListener('resize', resizeHandle, false);
    }
  }, []);
  return (
    <div className="App">
      <Header />
      <MonacoEditor
        ref={(instance) => {
          if (instance) {
            editor.current = instance;
          }
        }}
        theme="nginx-theme"
        language="nginx"
        value={nginxStr}
        height="calc(100vh - 36px)"
        options={{
          theme: 'vs-dark',
        }}
      />
    </div>
  );
};

export default App;
