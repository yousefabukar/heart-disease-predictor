import React from 'react';

interface ResultsPageProps {
  risk: number;
  onBackToCalculator: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ risk, onBackToCalculator }) => {
  const styles = {
    container: {
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#D32F2F',
      fontSize: '2.5rem',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    result: {
      fontSize: '1.5rem',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: '#D32F2F',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Heart Disease Risk Assessment Results</h1>
      <p style={styles.result}>
        {risk === 0 ? (
          "Based on the provided information, you are not at high risk of heart disease."
        ) : risk === 1 ? (
          "Based on the provided information, you may be at risk of heart disease. Please consult with a healthcare professional."
        ) : (
          "Unable to determine risk. Please try again or consult with a healthcare professional."
        )}
      </p>
      <button onClick={onBackToCalculator} style={styles.backButton}>
        Back to Calculator
      </button>
    </div>
  );
};

export default ResultsPage;