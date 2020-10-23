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
    <>
      <div id="description-font" className="description"> PopPUNK-web is a genomic epidemiology tool designed to exclusively analyse SARS-CoV-2 and Influenza genomes. Sequences are sketched at varying k-mer lengths in-browser, then species and strain are identified.</div>
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
  );
};

export default DropZone;