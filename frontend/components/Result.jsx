import React from 'react';
import '@styles/FileUpload.css';

const Result = ({ interpretation, fileName }) => {
  const renderInterpretation = () => {
    if (typeof interpretation === 'string') {
      return (
        <div className="card">
          <div className="card-header">Interprétation Du Fichier : {fileName}</div>
          <div className="card-content" dangerouslySetInnerHTML={{ __html: interpretation }} />
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-header">Interprétation</div>
        <div className="card-content">
          <pre>{convertJsonToString(interpretation)}</pre>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderInterpretation()}
    </div>
  );
};

function convertJsonToString(jsonObject) {
  try {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    return jsonString;
  } catch (error) {
    console.error('Erreur lors de la conversion JSON en chaîne de caractères :', error);
    return 'Erreur lors de la conversion JSON.';
  }
}

export default Result;
