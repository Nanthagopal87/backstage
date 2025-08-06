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
  Collapse,
} from '@mui/material';

type JsonObject = { [key: string]: any };

function deepMerge(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      key in target &&
      target[key] instanceof Object
    ) {
      source[key] = deepMerge(target[key], source[key]);
    }
  }
  return { ...target, ...source };
}

export const ExampleComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [jsonData, setJsonData] = useState<JsonObject>({});
  const [keyInput, setKeyInput] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const [mergePreview, setMergePreview] = useState<JsonObject | null>(null);
  const [showPasteSection, setShowPasteSection] = useState(false);
  const [error, setError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
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

    let parsedValue: any;
    const raw = valueInput.trim();

    try {
      parsedValue = JSON.parse(raw);
      if (tabIndex === 1 && !Array.isArray(parsedValue)) {
        setError('Value must be a valid JSON array');
        return;
      }
    } catch {
      try {
        parsedValue = JSON.parse(`"${raw.replace(/"/g, '\\"')}"`);
        if (tabIndex === 1) {
          setError('Value must be a JSON array');
          return;
        }
      } catch {
        setError('Invalid input. Must be valid JSON or plain string.');
        return;
      }
    }

    const keys = keyInput.trim().split('.');
    const newData = { ...jsonData };
    let current = newData;

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
    setMergePreview(null);
    setPasteInput('');
  };

  const handleMergePreview = () => {
    try {
      const parsed = JSON.parse(pasteInput);
      if (typeof parsed !== 'object') {
        setError('Pasted JSON must be an object or array');
        return;
      }
      const preview = deepMerge(jsonData, parsed);
      setMergePreview(preview);
      setError('');
    } catch {
      setError('Invalid pasted JSON');
    }
  };

  const confirmMerge = () => {
    if (mergePreview) {
      setJsonData(mergePreview);
      setMergePreview(null);
      setPasteInput('');
    }
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
                ? 'JSON Value (e.g. hello, 123, true, {"x":1})'
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

          {/* Toggle for Paste Section */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              onClick={() => setShowPasteSection(!showPasteSection)}
            >
              {showPasteSection ? 'Hide Paste Full JSON' : 'Show Paste Full JSON'}
            </Button>

            {showPasteSection && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Paste Full JSON
                </Typography>

                <TextField
                  label="Paste a full JSON object or array"
                  fullWidth
                  multiline
                  minRows={4}
                  value={pasteInput}
                  onChange={e => setPasteInput(e.target.value)}
                />

                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button variant="outlined" onClick={handleMergePreview}>
                    Preview Merge
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={confirmMerge}
                    disabled={!mergePreview}
                  >
                    Confirm Merge
                  </Button>
                </Stack>

                <Collapse in={!!mergePreview} sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Preview Merged JSON:</Typography>
                  <pre
                    style={{
                      background: '#f5f5f5',
                      padding: '1rem',
                      borderRadius: '8px',
                      overflowX: 'auto',
                    }}
                  >
                    {JSON.stringify(mergePreview, null, 2)}
                  </pre>
                </Collapse>
              </Box>
            )}
          </Box>

          {/* Final JSON Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Final JSON Output:
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
