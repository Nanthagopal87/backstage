/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';
//Newly added for fs:action

const backend = createBackend();

backend.add(import('@backstage/plugin-scaffolder-backend')); //Default

//backend.add(import('./scafolder')); // or correct relative path

//backend.add(scaffolderModuleCustomExtensions); //Newly added on behalf of CustomAction

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));

backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));

backend.add(import('@backstage/plugin-catalog-backend-module-gitlab'));
backend.add(import('@backstage/plugin-techdocs-backend'));

// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
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

backend.start();


