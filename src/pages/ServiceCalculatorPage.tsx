import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCalculator } from '@/components/ServiceCalculator';

const ServiceCalculatorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <ServiceCalculator onBack={() => navigate('/')} />
      </div>
    </div>
  );
};

export default ServiceCalculatorPage;