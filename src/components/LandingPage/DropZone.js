import React from "react";
import { useDropzone } from "react-dropzone";

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

const DropZone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="landing-grid">
      <>
        <div className="description">
          <>
            <div className="description-text">
              <p id="description-header-font"> What is PopPUNK-web?</p>
              <div id="description-font">PopPUNK-web is a genomic epidemiology tool designed to identify the species and strain of a pathogen sequence.</div>
            </div>
            <div className="description-text">
              <p id="description-header-font">Is PopPUNK-web secure?</p>
              <div id="description-font">Sequences are sketched in-Browser and discarded after sketching.</div>
            </div>
            <div className="description-text">
              <p id="description-header-font">What pathogens are supported?</p>
              <div id="description-font">SARS-CoV-2, Influenza and Pneumococcus sequences are currently supported.</div>
            </div>
          </>
        </div>
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
          <input className="dropzone-input" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <div id="dropzone-active" className="dropzone-content">Release to drop the sequence file here</div>
            ) : (
              <div id="dropzone-inactive" className="dropzone-content">
                Drag and drop a query sequence to begin
                <div id="accepted-files">(FA, FNA, FASTA, FAS and TXT files are supported)</div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default DropZone;