import { createBackendModule } from "@backstage/backend-plugin-api";
import { scaffolderActionsExtensionPoint  } from '@backstage/plugin-scaffolder-node/alpha';
import { createExampleAction } from "./actions/example";
import { createEncodeAction } from "./actions/encode-action";

/**
 * A backend module that registers the action into the scaffolder
 */
export const scaffolderModule = createBackendModule({
  moduleId: 'example-action',
  pluginId: 'scaffolder',
  register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint
      },
      async init({ scaffolderActions}) {
        scaffolderActions.addActions(createExampleAction());
      }
    });
  },
})

export const scaffolderMyModule = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'my-module',
 register({ registerInit }) {
    registerInit({
      deps: {
        scaffolderActions: scaffolderActionsExtensionPoint
      },
     async init({ scaffolderActions}) {
        scaffolderActions.addActions(createEncodeAction());
      }
    });
  },
});
