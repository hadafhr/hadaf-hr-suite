import React from 'react';
import { DemoHubHeader } from '@/components/demo-hub/DemoHubHeader';
import { DemoHubHero } from '@/components/demo-hub/DemoHubHero';
import { ProductsSection } from '@/components/demo-hub/ProductsSection';
import { IndustriesSection } from '@/components/demo-hub/IndustriesSection';
import { KnowledgeSection } from '@/components/demo-hub/KnowledgeSection';
import { TestimonialsSection } from '@/components/demo-hub/TestimonialsSection';
import { DemoHubFooter } from '@/components/demo-hub/DemoHubFooter';

const InteractiveTour = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <DemoHubHeader />
      <DemoHubHero />
      <ProductsSection />
      <IndustriesSection />
      <KnowledgeSection />
      <TestimonialsSection />
      <DemoHubFooter />
    </div>
  );
};

export default InteractiveTour;