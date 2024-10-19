import React from 'react';

interface Result {
  id: number;
  title: string;
  description: string;
}

interface ResultsPageProps {
  results: Result[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ results }) => {
  return (
    <div className="results-page">
      <h1>Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <h2>{result.title}</h2>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage; 