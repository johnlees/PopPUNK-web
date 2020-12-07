import React from "react";
import { useDropzone } from "react-dropzone";

const getClassName = (className, isActive) => {
  if (!isActive) return className;
  return `${className} ${className}-active`;
};

const DropZone = ({ onDrop, CanvasHeight }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="landing-grid">
      <>
        <div className="description">
          <>
            <div className="description-text">
              <p id="description-header-font" style={{fontSize:(CanvasHeight*0.020813623 + "px")}}> What is PopPUNK-web?</p>
              <div id="description-font" style={{fontSize:(CanvasHeight*0.017975402 + "px")}}>PopPUNK-web is a genomic epidemiology tool designed to identify the species and strain of a pathogen sequence.</div>
            </div>
            <div className="description-text">
              <p id="description-header-font" style={{fontSize:(CanvasHeight*0.020813623 + "px")}}>Is PopPUNK-web secure?</p>
              <div id="description-font" style={{fontSize:(CanvasHeight*0.017975402 + "px")}}>Sequences are sketched in-Browser and discarded after sketching.</div>
            </div>
            <div className="description-text">
              <p id="description-header-font" style={{fontSize:(CanvasHeight*0.020813623 + "px")}}>What pathogens are supported?</p>
              <div id="description-font" style={{fontSize:(CanvasHeight*0.017975402 + "px")}}>Streptococcus pneumoniae sequences are currently supported.</div>
            </div>
          </>
        </div>
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
          <input className="dropzone-input" {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <div id="dropzone-active" className="dropzone-content" style={{fontSize:(CanvasHeight*0.028382214 + "px")}}>Release to drop the sequence file here</div>
            ) : (
              <div id="dropzone-inactive" className="dropzone-content" style={{fontSize:(CanvasHeight*0.028382214 + "px")}}>
                Drag and drop a query sequence to begin
                <div id="accepted-files" style={{fontSize:(CanvasHeight*0.018921476 + "px")}}>(FA, FNA, FASTA, FAS and TXT files are supported)</div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default DropZone;