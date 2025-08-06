import React, { useState } from 'react';
import { Content, Page } from '@backstage/core-components';

export const ExampleComponent = () => {
  const [jsonData, setJsonData] = useState<{ [key: string]: string }>({});
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const handleAdd = () => {
    if (!keyInput) {
      alert('Key is required');
      return;
    }

    setJsonData(prev => ({
      ...prev,
      [keyInput]: valueInput,
    }));

    setKeyInput('');
    setValueInput('');
  };

  return (
    <Page themeId="tool">
      <Content>
        <h2>Modify JSON</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Key"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            style={{ marginRight: 10, padding: 5 }}
          />
          <input
            type="text"
            placeholder="Value"
            value={valueInput}
            onChange={e => setValueInput(e.target.value)}
            style={{ marginRight: 10, padding: 5 }}
          />
          <button onClick={handleAdd} style={{ padding: '5px 10px' }}>
            Add / Update
          </button>
        </div>

        <pre style={{
          background: '#f4f4f4',
          padding: 10,
          borderRadius: 5,
          whiteSpace: 'pre-wrap',
        }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </Content>
    </Page>
  );
};
