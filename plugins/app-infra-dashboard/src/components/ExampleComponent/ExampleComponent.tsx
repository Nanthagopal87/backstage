import React, { useState, useMemo } from 'react';
import {
  Page,
  Header,
  Content,
  ContentHeader,
  InfoCard,
  Select,
} from '@backstage/core-components';

import { Box, Chip, FormControl, InputLabel, MenuItem, Typography, Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ComputerIcon from '@material-ui/icons/Computer';
import CloudIcon from '@material-ui/icons/Cloud';
import RouterIcon from '@material-ui/icons/Router';
import InfoIcon from '@material-ui/icons/Info';

// Sample data same as before
const data = {
  apps: ['demo1', 'demo2'],
  demo1: {
    env: ['dev', 'uat', 'prd'],
    infra: {
      compute: ['VM', 'CloudRun', 'ILB'],
    },
    dev: {
      compute: ['VM', 'CloudRun', 'ILB'],
    },
    uat: {
      compute: ['VM'],
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

// Map infra types to icons and tooltips
const infraIconMap: Record<string, JSX.Element> = {
  VM: <ComputerIcon fontSize="small" />,
  CloudRun: <CloudIcon fontSize="small" />,
  ILB: <RouterIcon fontSize="small" />,
  LB: <RouterIcon fontSize="small" />,
  // fallback icon can be added if needed
};

const infraTooltipMap: Record<string, string> = {
  VM: 'Virtual Machine',
  CloudRun: 'Google Cloud Run (serverless container)',
  ILB: 'Internal Load Balancer',
  LB: 'Load Balancer',
  ExtraResource: 'Extra resource not defined in desired infra',
};

export const ExampleComponent = () => {
  const defaultApp = data.apps[0] ?? '';
  const [selectedApp, setSelectedApp] = useState<string>(defaultApp);

  const desiredCompute = useMemo(() => data[selectedApp]?.infra?.compute || [], [selectedApp]);
  const envs = useMemo(() => data[selectedApp]?.env || [], [selectedApp]);

  return (
    <Page themeId="tool">
      <Header title="App Infra Dashboard" subtitle="View desired and current infrastructure" />
      <Content>
        <ContentHeader title={
          <>
            Select Application{' '}
            <Tooltip title="Select the application to view its infrastructure status">
              <InfoIcon fontSize="small" style={{ verticalAlign: 'middle', cursor: 'pointer' }} />
            </Tooltip>
          </>
        } />
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
            <InfoCard title={
              <>
                Desired Infrastructure{' '}
                <Tooltip title="This is the desired infrastructure configuration for the application">
                  <InfoIcon fontSize="small" style={{ verticalAlign: 'middle', cursor: 'pointer' }} />
                </Tooltip>
              </>
            }>
              {desiredCompute.length === 0 ? (
                <Typography>No compute resources defined.</Typography>
              ) : (
                <Box display="flex" gap={1} flexWrap="wrap">
                  {desiredCompute.map(cmp => (
                    <Tooltip key={cmp} title={infraTooltipMap[cmp] || cmp}>
                      <Chip
                        label={cmp}
                        color="primary"
                        icon={infraIconMap[cmp] || <InfoIcon />}
                        style={{ cursor: 'default' }}
                      />
                    </Tooltip>
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
                <InfoCard title={
                  <>
                    Current State: {env}{' '}
                    <Tooltip title={`Currently deployed resources in the ${env} environment`}>
                      <InfoIcon fontSize="small" style={{ verticalAlign: 'middle', cursor: 'pointer' }} />
                    </Tooltip>
                  </>
                }>
                  {currentCompute.length === 0 ? (
                    <Typography>No compute resources deployed.</Typography>
                  ) : (
                    <Box display="flex" gap={1} flexWrap="wrap">
                      {currentCompute.map(cmp => (
                        <Tooltip key={cmp} title={infraTooltipMap[cmp] || cmp}>
                          <Chip label={cmp} color="success" icon={infraIconMap[cmp] || <InfoIcon />} />
                        </Tooltip>
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
                          <Tooltip key={cmp} title={infraTooltipMap[cmp] || cmp}>
                            <Chip label={cmp} color="error" variant="outlined" icon={<InfoIcon />} />
                          </Tooltip>
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
                          <Tooltip key={cmp} title={infraTooltipMap[cmp] || cmp}>
                            <Chip label={cmp} color="warning" variant="outlined" icon={<InfoIcon />} />
                          </Tooltip>
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
