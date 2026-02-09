/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';

// // --- NEW IMPORTS START ---
// import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
// import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
// import { GitlabLifecycleProcessor } from './processors/GitlabLifecycleProcessor'; // Your custom processor
// // --- NEW IMPORTS END ---


// --- NEW IMPORTS START ---
// We no longer need CatalogBuilder and ScaffolderEntitiesProcessor directly here
// as they will be managed by the catalog plugin's createPlugin function.
// We *do* need ScaffolderEntitiesProcessor for its constructor to be passed to the catalog plugin.
//import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
// CORRECTED: ScaffolderEntitiesProcessor is from @backstage/plugin-catalog-backend

//import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend';
//
//import { ScaffolderEntitiesProcessor } from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';

//import { GitlabLifecycleProcessor } from './processors/GitlabLifecycleProcessor'; // Your custom processor
// --- NEW IMPORTS END ---



const backend = createBackend();

backend.add(import('@backstage/plugin-scaffolder-backend')); //Default

//backend.add(import('./scafolder')); // or correct relative path

//backend.add(scaffolderModuleCustomExtensions); //Newly added on behalf of CustomAction

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));

/* GitLab modules */
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab'));
// Add this line to your backend
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org'));



backend.add(import('@backstage/plugin-techdocs-backend'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));

// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
// See https://backstage.io/docs/auth/guest/provider

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));

backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// See https://backstage.io/docs/features/software-catalog/configuration#subscribing-to-catalog-errors
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// permission plugin
backend.add(import('@backstage/plugin-permission-backend'));
// See https://backstage.io/docs/permissions/getting-started for how to create your own permission policy
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// search plugin
backend.add(import('@backstage/plugin-search-backend'));

// search engine
// See https://backstage.io/docs/features/search/search-engines
backend.add(import('@backstage/plugin-search-backend-module-pg'));

// search collators
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// kubernetes
backend.add(import('@backstage/plugin-kubernetes-backend'));

// Custom Plugins
// See https://backstage.io/docs/plugins/creating-plugins#adding-a-plugin-to-the-backend
backend.add(import('@internal/plugin-scaffolder-backend-module-my-awesome-plugin'));
backend.add(import('@internal/plugin-scaffolder-backend-module-update-autovars'));
backend.add(import('@internal/plugin-scaffolder-backend-module-download-json'));

// ADD THIS FOR GITLAB CI/CD SUPPORT
//backend.add(import('@immobiliarelabs/backstage-plugin-gitlab-backend'));
//yarn --cwd packages/backend add @immobiliarelabs/backstage-plugin-gitlab-backend
//backend.add(import('@immobiliarelabs/backstage-plugin-gitlab-backend/alpha'));



// (Optional) This module automatically fills in GitLab annotations if they are missing
//backend.add(import('@immobiliarelabs/backstage-plugin-gitlab-backend-module-catalog-filler'));
//yarn --cwd packages/backend add @immobiliarelabs/backstage-plugin-gitlab-backend-module-catalog-filler

// Add our custom Fix Module
//backend.add(gitlabSaaSFix);

backend.add(import('@internal/plugin-gitlab-lifecycle-backend-backend'));
backend.start();


