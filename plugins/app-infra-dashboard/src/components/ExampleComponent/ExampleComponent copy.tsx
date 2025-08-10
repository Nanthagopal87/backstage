import React, { useState, useMemo, useEffect } from 'react';
import {
  Page,
  Header,
  Content,
  ContentHeader,
  InfoCard,
  Select,
} from '@backstage/core-components';

import { Box, Chip, FormControl, InputLabel, MenuItem, Typography, Grid } from '@material-ui/core';

// Sample data (replace with your real data)
const data = {
  apps: ['demo1', 'demo2'],
  demo1: {
    env: ['dev', 'uat', "stg","box",'prd'],
    infra: {
      compute: ['VM', 'CloudRun', 'ILB'],
    },
    dev: {
      compute: ['VM', 'CloudRun', 'ILB'],
    },
    uat: {
      compute: ['VM'], // example partial
    },
    prd: {
      compute: ['VM', 'ILB', 'ExtraResource'],
    },
  },
  demo2: {
    env: ['dev', 'uat'],
    infra: {
      compute: ['CloudRun', 'ILB'],
    },
    dev: {
      compute: ['CloudRun'],
    },
    uat: {
      compute: ['CloudRun', 'ILB'],
    },
  },
};

function arrayDiff(a: string[] = [], b: string[] = []) {
  return a.filter(x => !b.includes(x));
}

export const ExampleComponent = () => {
  const defaultApp = data.apps[0] ?? '';
  const [selectedApp, setSelectedApp] = useState<string>(defaultApp);

  const desiredCompute = useMemo(() => data[selectedApp]?.infra?.compute || [], [selectedApp]);
  const envs = useMemo(() => data[selectedApp]?.env || [], [selectedApp]);

  return (
    <Page themeId="tool">
      <Header title="App Infra Dashboard" subtitle="View desired and current infrastructure" />
      <Content>
        <ContentHeader title="Select Application" />
        <Box mb={3} style={{ maxWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="app-select-label">Application</InputLabel>
            <Select
              labelId="app-select-label"
              value={selectedApp}
              onChange={e => setSelectedApp(e.target.value)}
              label="Application"
            >
              {data.apps.map(app => (
                <MenuItem key={app} value={app}>
                  {app}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {/* Desired Infra */}
          <Grid item xs={12}>
            <InfoCard title="Desired Infrastructure">
              {desiredCompute.length === 0 ? (
                <Typography>No compute resources defined.</Typography>
              ) : (
                <Box display="flex" gap={1} flexWrap="wrap">
                  {desiredCompute.map(cmp => (
                    <Chip key={cmp} label={cmp} color="primary" />
                  ))}
                </Box>
              )}
            </InfoCard>
          </Grid>

          {/* Current State per environment */}
          {envs.map(env => {
            const currentCompute = data[selectedApp]?.[env]?.compute || [];
            const missingInCurrent = arrayDiff(desiredCompute, currentCompute);
            const extraInCurrent = arrayDiff(currentCompute, desiredCompute);

            return (
              <Grid key={env} item xs={12} md={6}>
                <InfoCard title={`Current State: ${env}`}>
                  {currentCompute.length === 0 ? (
                    <Typography>No compute resources deployed.</Typography>
                  ) : (
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {currentCompute.map(cmp => (
                        <Chip key={cmp} label={cmp} color="success" />
                      ))}
                    </Box>
                  )}

                  {missingInCurrent.length > 0 && (
                    <Box mt={2}>
                      <Typography color="error" variant="subtitle2">
                        Missing Resources:
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                        {missingInCurrent.map(cmp => (
                          <Chip key={cmp} label={cmp} color="error" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {extraInCurrent.length > 0 && (
                    <Box mt={2}>
                      <Typography color="warning.main" variant="subtitle2">
                        Extra Resources:
                      </Typography>
                      <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                        {extraInCurrent.map(cmp => (
                          <Chip key={cmp} label={cmp} color="warning" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  )}
                </InfoCard>
              </Grid>
            );
          })}
        </Grid>
      </Content>
    </Page>
  );
};
