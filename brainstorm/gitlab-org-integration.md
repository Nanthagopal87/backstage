
yarn --cwd packages/backend add @backstage/plugin-catalog-backend-module-gitlab @backstage/plugin-catalog-backend-module-gitlab-org


Backend Registration (packages/backend/src/index.ts):

const backend = createBackend();
// ... other modules
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org/alpha'));
backend.start();


rules:
    - allow: [Component, System, API, Resource, Location, Template, Domain, Group, User]


```
catalog:
  providers:
    gitlab:
      # Unified provider for everything in this group
      cloudopsedge:
        host: gitlab.com
        # 1. FIX 404: Use the numeric Group ID found on your GitLab group's home page
        group: '12345678' 
        
        # 2. Project Discovery (Components)
        entityFilename: 'catalog-info.yaml'
        projectPattern: '.*'
        
        # 3. Org Discovery (Users & Groups)
        # This requires @backstage/plugin-catalog-backend-module-gitlab-org
        orgEnabled: true 
        recursive: true
        
        schedule:
          frequency: { minutes: 15 }
          timeout: { minutes: 5 }

      # Dedicated provider for Templates (if they live in specific paths)
      # Keep this separate ONLY if the projectPattern is different to avoid conflicts
      nanthaTemplates:
        host: gitlab.com
        group: '12345678'
        entityFilename: 'templates/all-templates.yaml'
        projectPattern: 'backstage-templates' # Only scan the template repo
        schedule:
          frequency: { minutes: 15 }
          timeout: { minutes: 5 }
```




$ curl --header "PRIVATE-TOKEN: " "https://gitlab.com/api/v4/groups/118654065/members"


curl --header "PRIVATE-TOKEN: " "https://gitlab.com/api/v4/groups/118654065/projects?include_s
ubgroups=true&archived=false"


