import { useState } from 'react';
import {
  Content,
  Page,
  Header,
  HeaderLabel,
} from '@backstage/core-components';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Divider,
} from '@mui/material';

export const JsonTesterPage = () => {
  const [gitlabRepoUrl, setGitlabRepoUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [gitlabToken, setGitlabToken] = useState('');
  const [modifications, setModifications] = useState('{}');
  const [originalJson, setOriginalJson] = useState('');
  const [modifiedJson, setModifiedJson] = useState('');
  const [error, setError] = useState('');

  const handleFetchOriginalJson = async () => {
    setError('');
    setOriginalJson('');
    try {
      const response = await fetch('/api/json-modify/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gitlabRepoUrl,
          filePath,
          gitlabToken,
          modifications: {}, // Just fetch without modifying
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setOriginalJson(JSON.stringify(data.modifiedJson, null, 2));
      }
    } catch (err) {
      setError('❌ Error fetching JSON: ' + String(err));
    }
  };

  const handlePreviewModifiedJson = async () => {
    setError('');
    setModifiedJson('');
    try {
      const response = await fetch('/api/json-modify/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gitlabRepoUrl,
          filePath,
          gitlabToken,
          modifications: JSON.parse(modifications),
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(`❌ GitLab Error: ${data.error}`);
      } else {
        setModifiedJson(JSON.stringify(data.modifiedJson, null, 2));
      }
    } catch (err) {
      setError('❌ Error applying modifications: ' + String(err));
    }
  };

  return (
    <Page themeId="tool">
      <Header
        title="GitLab JSON Modifier"
        subtitle="Fetch JSON from GitLab and preview your changes"
      />
      <HeaderLabel label="Mode" value="Test Preview" />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="GitLab Repo URL"
              fullWidth
              value={gitlabRepoUrl}
              onChange={e => setGitlabRepoUrl(e.target.value)}
              margin="normal"
            />
            <TextField
              label="File Path in Repo"
              fullWidth
              value={filePath}
              onChange={e => setFilePath(e.target.value)}
              margin="normal"
              placeholder="e.g., config/app.json"
            />
            <TextField
              label="GitLab Token"
              fullWidth
              value={gitlabToken}
              onChange={e => setGitlabToken(e.target.value)}
              margin="normal"
              type="password"
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleFetchOriginalJson}
              style={{ marginTop: 16 }}
            >
              📥 Fetch Original JSON
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Modifications (JSON format)"
              fullWidth
              multiline
              rows={8}
              value={modifications}
              onChange={e => setModifications(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePreviewModifiedJson}
              style={{ marginTop: 16 }}
            >
              ▶️ Preview Modified JSON
            </Button>
          </Grid>
        </Grid>

        <Divider style={{ margin: '20px 0' }} />

        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}

        {originalJson && (
          <>
            <Typography variant="h6">📄 Original JSON</Typography>
            <pre>{originalJson}</pre>
          </>
        )}

        {modifiedJson && (
          <>
            <Typography variant="h6">🧪 Modified JSON Preview</Typography>
            <pre>{modifiedJson}</pre>
          </>
        )}
      </Content>
    </Page>
  );
};
