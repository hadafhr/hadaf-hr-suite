import React from 'react';
import { ITSolutionsHeader } from '@/components/it-solutions/ITSolutionsHeader';
import { ITSolutionsHero } from '@/components/it-solutions/ITSolutionsHero';

const ITSolutionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <ITSolutionsHeader />
      <ITSolutionsHero />
    </div>
  );
};

export default ITSolutionsPage;