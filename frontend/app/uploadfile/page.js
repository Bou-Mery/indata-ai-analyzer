"use client";

import React, { useState } from 'react';
import '@styles/FileUpload.css';
import axios from 'axios';
import Result from '@components/Result';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [interpretation, setInterpretation] = useState(null);
  const [visualization, setVisualization] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session } = useSession();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'Fichier non sélectionné',
        text: 'Veuillez sélectionner un fichier.',
      });
      return;
    }

    setIsProcessing(true);
    Swal.fire({
      title: 'Traitement en cours',
      text: 'Veuillez patienter pendant que le fichier est traité.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { file_name, interpretation, visualization } = response.data;
      setFileName(file_name);
      setInterpretation(interpretation);
      setVisualization(visualization);

      if (session) {
        // Construct the request body
        const requestBody = {
          emailUser: session.user.email,
          nameFile: file_name,
          interpretation,
        };

        // Log the request body
        console.log('Request Body:', requestBody);

        // Send the request to save the file
        const saveFileResponse = await axios.post('/api/save-file', requestBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Log the response
        console.log('Save File Response:', saveFileResponse.data);
      }

      Swal.fire({
        icon: 'success',
        title: 'Fichier traité',
        text: 'Votre fichier a été traité avec succès !',
        didClose: () => setIsProcessing(false)
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'envoi du fichier.',
        didClose: () => setIsProcessing(false)
      });
      console.error('Error:', error);
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
      }
    }
  };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h3 className='head_text text-center'>
        <span className=' flex-center'>Analyse de vos données</span>
      </h3>
      <p className='desc text-left max-w-md'>
        Pour commencer, veuillez télécharger vos fichiers de données au format Excel, CSV :
      </p>
      <div className='container fileContainer'>
        <div className="container">
          <h4 className='insert flex-center'>Insérer un fichier Excel ou CSV</h4>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="input"
            disabled={isProcessing}
          />
          <button 
            onClick={handleFileUpload} 
            className="button flex-center"
            disabled={isProcessing}
          >
            {isProcessing ? 'Traitement en cours...' : 'Upload'}
          </button>
        </div>
        <br/>
        <br/>
        {interpretation && <Result interpretation={interpretation} fileName={fileName} />}
        {visualization && (
          <div className="visualization">
            <iframe
              src="http://localhost:8501"
              width="100%"
              height="800px"
              title="Streamlit Visualization"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileUpload;
