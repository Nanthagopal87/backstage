import React, { useState } from 'react';
import { Page, Content } from '@backstage/core-components';
import {
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Alert,
} from '@mui/material';

type JsonObject = { [key: string]: any };

export const ExampleComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jsonData, setJsonData] = useState<JsonObject>({});
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [error, setError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    setError('');
    setKeyInput('');
    setValueInput('');
  };

  const validateAndAdd = () => {
    if (!keyInput.trim()) {
      setError('Key is required');
      return;
    }

    try {
      const parsedValue = JSON.parse(valueInput);

      if (tabIndex === 1 && !Array.isArray(parsedValue)) {
        setError('Value must be a valid JSON array');
        return;
      }

      const keys = keyInput.trim().split('.');
      const newData = { ...jsonData };
      let current: any = newData;

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = parsedValue;
        } else {
          if (!current[k] || typeof current[k] !== 'object') {
            current[k] = {};
          }
          current = current[k];
        }
      }

      setJsonData(newData);
      setKeyInput('');
      setValueInput('');
      setError('');
    } catch {
      setError(
        'Invalid JSON value. Must be valid JSON such as "admin", 123, true, [1,2], or {"a":1}',
      );
    }
  };

  const validateFinalJson = () => {
    try {
      JSON.stringify(jsonData);
      setValidationMessage('✅ Valid JSON');
    } catch {
      setValidationMessage('❌ Invalid JSON');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch {
      setCopyMessage('Failed to copy.');
    }
  };

  const clearJson = () => {
    setJsonData({});
    setValidationMessage('');
    setCopyMessage('');
    setError('');
  };

  return (
    <Page themeId="tool">
      <Content>
        <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            JSON Modifier Tool
          </Typography>

          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Add/Modify Object Value" />
            <Tab label="Add/Modify Array Value" />
          </Tabs>

          <TextField
            label="Key (supports nested e.g. user.profile.name)"
            fullWidth
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            margin="normal"
          />

          <TextField
            label={
              tabIndex === 0
                ? 'JSON Value (e.g. "admin", 123, true)'
                : 'JSON Array (e.g. ["dev", "ops"])'
            }
            fullWidth
            multiline
            value={valueInput}
            onChange={e => setValueInput(e.target.value)}
            margin="normal"
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button variant="contained" onClick={validateAndAdd} sx={{ mt: 2 }}>
            Add / Update
          </Button>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Updated JSON:
            </Typography>

            <pre
              style={{
                background: '#f5f5f5',
                padding: '1rem',
                borderRadius: '8px',
                overflowX: 'auto',
              }}
            >
              {JSON.stringify(jsonData, null, 2)}
            </pre>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="outlined" onClick={validateFinalJson}>
                Validate JSON
              </Button>
              <Button variant="outlined" onClick={copyToClipboard}>
                Copy to Clipboard
              </Button>
              <Button variant="outlined" color="error" onClick={clearJson}>
                Clear JSON
              </Button>
            </Stack>

            {validationMessage && (
              <Alert
                severity={
                  validationMessage.includes('Valid') ? 'success' : 'error'
                }
                sx={{ mt: 2 }}
              >
                {validationMessage}
              </Alert>
            )}

            {copyMessage && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                {copyMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Content>
    </Page>
  );
};
