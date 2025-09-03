import React from 'react';
import ComprehensiveRewardsSystem from './ComprehensiveRewardsSystem';

interface RewardsManagerProps {
  onBack?: () => void;
}

export const RewardsManager: React.FC<RewardsManagerProps> = ({ onBack }) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return <ComprehensiveRewardsSystem onBack={handleBack} />;
};