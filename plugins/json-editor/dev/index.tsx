import { createDevApp } from '@backstage/dev-utils';
import { jsonEditorPlugin, JsonEditorPage } from '../src/plugin';

createDevApp()
  .registerPlugin(jsonEditorPlugin)
  .addPage({
    element: <JsonEditorPage />,
    title: 'Root Page',
    path: '/json-editor',
  })
  .render();
