"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import '@styles/Dashboard.css';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [fileHistory, setFileHistory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 5; // Nombre de fichiers par page
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
    if (selectedFile && selectedFile._id === file._id) {
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredFiles = fileHistory.filter(file =>
    file.nameFile.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFiles.length / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Historique de vos fichiers</h2>
      
      {/* Filter Input */}
      <div className="filter-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Rechercher par nom de fichier..."
          className="filter-input"
        />
      </div>

      {currentFiles.length === 0 ? (
        <p className="dashboard-no-files">Aucun fichier téléchargé.</p>
      ) : (
        <ul className="dashboard-file-list">
          {currentFiles.map((file) => (
            <li key={file._id} className="dashboard-file-item">
              <button
                onClick={() => handleFileClick(file)}
                className="file-item-button"
              >
                {file.nameFile}
              </button>
              <p>Date: {new Date(file.createdAt).toLocaleString()}</p>
              
              {selectedFile && selectedFile._id === file._id && (
                <div className="file-interpretation">
                  <h3 className="h3file">Interprétation</h3>
                  <div
                    className="card-content"
                    dangerouslySetInnerHTML={{ __html: file.interpretation }}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      
      {/* Pagination Controls */}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-button ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
