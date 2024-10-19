import React, { useState } from 'react';
import HeartDiseaseCalculator from './HeartDiseaseCalculator';
import ResultsPage from './ResultsPage';

const App: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [risk, setRisk] = useState<number>(-1);

  const handleCalculateRisk = (calculatedRisk: number) => {
    setRisk(calculatedRisk);
    setShowResults(true);
  };

  const handleBackToCalculator = () => {
    setShowResults(false);
  };

  return (
    <div>
      {showResults ? (
        <ResultsPage risk={risk} onBackToCalculator={handleBackToCalculator} />
      ) : (
        <HeartDiseaseCalculator onCalculateRisk={handleCalculateRisk} />
      )}
    </div>
  );
};

export default App;