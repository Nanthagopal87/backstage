//import React from 'react';
import { 
  ExploreLayout, 
  CatalogKindExploreContent 
} from '@backstage-community/plugin-explore';

export const explorePage = (
  <ExploreLayout 
    title="Explore the ecosystem" 
    subtitle="Discover solutions available in your organization"
  >
    {/* This will show your "Domain" entities from the catalog */}
    <ExploreLayout.Route path="domains" title="Domains">
      <CatalogKindExploreContent kind="domain" />
    </ExploreLayout.Route>

    {/* This will show your "Group" entities (teams) */}
    <ExploreLayout.Route path="groups" title="Groups">
      <CatalogKindExploreContent kind="group" />
    </ExploreLayout.Route>
    
  </ExploreLayout>
);