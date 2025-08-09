
### Create Frontend Plugin
```
yarn backstage-cli create-plugin --name json-tester
```

### Add Plugin to App
```
In packages/app/src/plugins.ts:
export { JsonTesterPage } from '@backstage/plugin-json-tester';
```

```
And in your routes.ts:
<Route path="/json-tester" element={<JsonTesterPage />} />
```

✅ Result
Now when you visit:
http://localhost:3000/json-tester

You get a UI with:
JSON input form
Modify logic preview
Instant feedback




### USECASE 2
List out  the step to modify the json file in gitlab repo using Backstage using custom actions.
1. Fetch the json file from a gitlab repo
2. Create a feature branch and modify the json based on inputs received through templates
3. Commit and Push the updated json back to Gitlab repo
4. Raise a PR request to main branch
5. Send a notifcation to MS team channel using api with the help of custom plugin


### Thoughts

Before implementing this, i have another thought. Before integrating Custom Actions in to the templetes, why can't we create a dedicated ui component for ease of testing. Just i want to pass the input key/value pair via ui with the help of actions it should result the modified json. Post checking i will integarte in to templates

That’s a very smart approach 💡—creating a dedicated UI component to test custom actions independently before embedding them in templates ensures:

Rapid iteration and debugging

UI flexibility for input

Clear preview of resulting JSON

✅ What You’re Proposing:
A standalone React UI component inside Backstage, where you input JSON keys/values → on submit, it runs the custom action logic → returns and displays the modified JSON preview.

🧩 Architecture
Frontend:

A custom React component plugin/page (e.g., json-tester)

Input form: JSON file URL, keys to modify, values

Output section: shows resulting modified JSON

Backend:

Reuse your custom action logic in an express route handler

Avoid Git clone for now (can test purely in-memory)

Accept JSON input, simulate transformation, return modified JSON

### ============== Create a new Plugin=============

1. yarn new
2. pick frontend-plugin
3. provide plugin name: e.g json-editor
It will install necessay components


4. Verify plugins folder under root dir => root/plugin/json-editor


5. Run the specific application
yarn workspace @internal/plugin-json-editor start

6. Access the aplicastion: http://localhost:3000

===============GitLab=======

https://backstage.io/docs/integrations/gitlab/org/#installation

Step 1:
yarn --cwd packages/backend add @backstage/plugin-catalog-backend-module-gitlab @backstage/plugin-catalog-backend-module-gitlab-org

Step 2:
index.ts
backend.add(import('@backstage/plugin-catalog-backend-module-gitlab-org'));

Step 3:
cd packages/backend
yarn add @backstage/plugin-scaffolder-backend-module-gitlab

Step : 4
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));



=============


https://gitlab.com/nantha-a/springdemo/-/blob/master/catalog-info.yaml
https://gitlab.com/platform-engineer4/gitlab/spring-boot-demo/-/blob/master/catalog-info.yaml


http://localhost:7007/scaffolder/actions

--------Working---------
github:repo:create
fetch:template
publish:github

https://piotrminkowski.com/2024/06/13/getting-started-with-backstage/


yarn workspace backend add fs-extra    ==> Works
npm i --save-dev @types/fs-extra       ==> Not works
yarn backstage-cli new    ==> Works  Pick scaffolder module



When we create a custom action, the following areas where files reflected
1. packages->backend->src->index.ts
2. packages->backend->package.json
3. packages->backend->plugins->action name


=============

action: fetch:github



====================

https://drodil.medium.com/creating-backstage-scaffolder-actions-7823b88c3c1c

6.50/6.40
Keywords:
- Buil-in Action
- Custom Action


http://localhost:3000/create/actions


http://localhost:3000/create/action

fs:readdir
fs:rename
fs:delete

'https://raw.githubusercontent.com/Nanthagopal87/node-js-app/main/README.md'
==================

set NODE_OPTIONS=--no-node-snapshot && yarn start).

Powershelll
$env:NODE_OPTIONS="--no-node-snapshot"; yarn start

Oversee the 

Ov23li6xw5HVK5FiRVnD

e203c9622c25ee153c4ff1a481ea48bc156d0f32

630517489744
9789776714
===============

https://www.cncf.io/blog/2024/01/29/creating-infra-using-backstage-templates-terraform-and-github-actions/


https://api.adviceslip.com/
https://api.adviceslip.com/advice


https://github.com/Sanjeev-Thiyagarajan/ec2-infra-blueprint

https://github.com/Sanjeev-Thiyagarajan/backstage-express-api-blueprint/blob/main/catalog-info.yaml

https://github.com/Sanjeev-Thiyagarajan/terraform-aws-ec2-infra



https://github.com/Sanjeev-Thiyagarajan/backstage-auth-service

===========
https://github.com/Sanjeev-Thiyagarajan/my-demo-app
https://github.com/Sanjeev-Thiyagarajan/backstage-templates/
https://github.com/Sanjeev-Thiyagarajan/backup-backstage-auth

https://github.com/Sanjeev-Thiyagarajan/backstage-guest-user-domain-system/
=======




=======================================

corepack enable
yarn set version 4.4.1
yarn -v

===========================================

npx @backstage/create-app@latest

cd my-backstage-app
yarn start



==================================== Integrations========================
Gitea
cd ~/backstage
yarn --cwd packages/backend add @backstage/plugin-scaffolder-backend-module-gitea

Step 2:Now we need to include the plugin in the Backstage backend. For this, you need to edit ~/backstage/packages/backend/src/index.ts file and add the following:

// add this line before backend.start() else it will not work
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitea'));


GitHUb
yarn --cwd packages/backend add @backstage/plugin-auth-backend-module-github-provider

backend.add(import('@backstage/plugin-auth-backend')); // this line is already present
backend.add(import('@backstage/plugin-auth-backend-module-github-provider')); // Add this line


Homepage URL
https://7007-port-nezbr6ffx2loratf.labs.kodekloud.com/

Authorization callback URL
https://7007-port-nezbr6ffx2loratf.labs.kodekloud.com/api/auth/github/handler/frame


Ov23lieWw4eZZjy5eCHP

1a78c034dff98925bc1f30a76b06800830f09f31


=============================

xxxxxxxxxxxx
yarn workspace @internal/backstage-plugin-advice start
xxxxxxxxxxxx

Start the Backstage server:
cd ~/backstage
yarn run start-backend


# Build the Backstage app as we changed the UI components
yarn run build:all

# Start the backend service
yarn run start-backend




# Navigate to the Backstage directory
cd ~/backstage

# Install the plugin using yarn
yarn --cwd packages/app add @roadiehq/backstage-plugin-github-pull-requests


======================Soln:
components: {
  SignInPage: props => (
    <SignInPage
      {...props}
      auto
      providers={[
        'guest',
        {
          id: 'github',
          title: 'GitHub',
          message: 'Sign in using GitHub',
          apiRef: githubAuthApiRef,
        },
      ]}
    />
  ),
},


auth:
  environment: development
  providers:
    github:
      development:
        clientId: Ov23lieWw4eZZjy5eCHP
        clientSecret: 1a78c034dff98925bc1f30a76b06800830f09f31
        signIn:
          resolvers:
            - resolver: usernameMatchingUserEntityName
			
			
			
			
==========================================XXXXXXXXXXXXXXXXXXXXXXXXXX===============================


apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: iam-role-assignment
  title: Add IAM Role to Group
  description: Template to assign new IAM role to a Google Group
spec:
  owner: platform-team@example.com
  type: service

  parameters:
    - title: IAM Role Assignment Details
      required:
        - group_name
        - role_name
      properties:
        group_name:
          type: string
          description: Name of the Google Group
        role_name:
          type: string
          description: IAM Role (e.g. roles/viewer)

  steps:
    - id: fetch
      name: Fetch Infra Repo
      action: fetch:template
      input:
        url: https://github.com/my-org/infra-repo
        targetPath: infra
        values:
          group_name: ${{ parameters.group_name }}
          role_name: ${{ parameters.role_name }}

    - id: patch-terraform
      name: Patch Terraform Code
      action: filesystem:append
      input:
        path: infra/iam/groups.tf
        content: |
          resource "google_project_iam_member" "group_${{ parameters.group_name }}" {
            project = "my-gcp-project"
            role    = "${{ parameters.role_name }}"
            member  = "group:${{ parameters.group_name }}"
          }

    - id: publish
      name: Commit & Push Changes
      action: publish:github
      input:
        repoUrl: github.com?owner=my-org&repo=infra-repo
        branch: main
        filePath: infra
        title: "Add IAM role for group ${{ parameters.group_name }}"
        description: "Added role ${{ parameters.role_name }} for group ${{ parameters.group_name }}"
        commitMessage: "Add IAM role for ${{ parameters.group_name }}"

  output:
    links:
      - title: View Infra Repo
        url: https://github.com/my-org/infra-repo


======================  Findings ==============

1. 
If you’re not seeing createRouter({... actions: [...] }) in your packages/backend/src/index.ts, your Backstage app may be using a modular plugin registration approach, which is common in newer Backstage versions.

2. 