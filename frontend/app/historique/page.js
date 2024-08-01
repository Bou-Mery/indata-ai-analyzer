"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import '@styles/Dashboard.css';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [fileHistory, setFileHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchFileHistory = async () => {
        try {
          const response = await axios.get("/api/get-file-history");
          setFileHistory(response.data);
        } catch (error) {
          console.error("Failed to fetch file history:", error);
        }
      };

      fetchFileHistory();
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Historique de vos fichiers</h2>
      {fileHistory.length === 0 ? (
        <p className="dashboard-no-files">Aucun fichier téléchargé.</p>
      ) : (
        <ul className="dashboard-file-list">
          {fileHistory.map((file) => (
            <li key={file._id} className="dashboard-file-item">
              <button onClick={() => handleFileClick(file)} className="file-item-button">
                {file.nameFile}
              </button>
              <p>Date: {new Date(file.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
      {selectedFile && (
        <div className="file-interpretation">
          <h2 className="h3file">Interprétation du fichier: {selectedFile.nameFile}</h2>
          <div className="card-content" dangerouslySetInnerHTML={{ __html: selectedFile.interpretation }} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
