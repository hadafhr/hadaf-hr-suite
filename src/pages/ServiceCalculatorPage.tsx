import React from 'react';
import { ServiceCalculator } from '@/components/ServiceCalculator';

const ServiceCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <ServiceCalculator />
      </div>
    </div>
  );
};

export default ServiceCalculatorPage;