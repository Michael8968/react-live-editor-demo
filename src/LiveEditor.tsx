import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const LiveEditor:React.FC = () => {
  const [html, setHtml] = useState('<div>Hello React!</div>');
  const [css, setCss] = useState('div { color: blue; }');
  const [js, setJs] = useState('// Write your React code here\nconst root = ReactDOM.createRoot(document.getElementById(\'root\'));\nroot.render(\n  <h1>Hello, world!</h1>\n);');
  const [activeTab, setActiveTab] = useState('html');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const iframe = window.document.getElementById('preview') as HTMLIFrameElement;
    console.log('html', html);
    const document = iframe.contentDocument as Document;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Preview</title>
        <style>${css}</style>
        <script>
          // 添加开发环境提示
          console.log('注意：这是一个开发环境预览，使用了浏览器端的 Babel 转换器。在生产环境中，应该使用预编译的代码。');
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/babel">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  }, [html, css, js, refreshKey]);

  const handleRun = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '10px', padding: '10px', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('html')}
              style={{ background: activeTab === 'html' ? '#ddd' : 'transparent' }}
            >
              HTML
            </button>
            <button 
              onClick={() => setActiveTab('css')}
              style={{ background: activeTab === 'css' ? '#ddd' : 'transparent' }}
            >
              CSS
            </button>
            <button 
              onClick={() => setActiveTab('js')}
              style={{ background: activeTab === 'js' ? '#ddd' : 'transparent' }}
            >
              JS
            </button>
            <button 
              onClick={handleRun}
              style={{ 
                marginLeft: 'auto',
                padding: '5px 15px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              运行
            </button>
          </div>
          <div style={{ flex: 1 }}>
            {activeTab === 'html' && (
              <Editor
                height="100%"
                defaultLanguage="html"
                value={html}
                onChange={(value) => setHtml(value || '')}
                theme="vs-dark"
              />
            )}
            {activeTab === 'css' && (
              <Editor
                height="100%"
                defaultLanguage="css"
                value={css}
                onChange={(value) => setCss(value || '')}
                theme="vs-dark"
              />
            )}
            {activeTab === 'js' && (
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={js}
                onChange={(value) => setJs(value || '')}
                theme="vs-dark"
              />
            )}
          </div>
        </div>
        <div style={{ width: '50%', borderLeft: '1px solid #ccc' }}>
          <h3 style={{ padding: '10px', margin: 0 }}>Preview</h3>
          <iframe
            id="preview"
            style={{ width: '100%', height: 'calc(100% - 40px)', border: 'none' }}
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}

export default LiveEditor;