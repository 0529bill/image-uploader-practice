import React, { useRef, useState } from 'react';
import './DragAndDrop.css';

function DragAndDrop({ data, dispatch }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    let checkedFiles = [...e.dataTransfer.files].filter(
      (t) => t.type === 'image/jpeg' || t.type === 'image/png'
    );

    if (checkedFiles && checkedFiles.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      checkedFiles = checkedFiles.filter(
        (f) => !existingFiles.includes(f.name)
      );

      dispatch({ type: 'ADD_FILE_TO_LIST', files: checkedFiles });
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
      alert('file upload successfully !');
    }
  };

  let handleNewFileUpload = (e) => {
    if (Object.keys(e.target.files).length === 0) {
      return;
    }
    let files = [...e.target.files];

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      alert('file upload successfully !');
    }
  };

  return (
    <div
      type="file"
      className="drag-drop-zone"
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      style={{ background: isDragOver ? '#f3eeee' : '#07f' }}
    >
      <button
        // for="files"
        className="btn"
        onClick={() => inputRef.current.click()}
      >
        Select Image
      </button>
      <input
        id="files"
        type="file"
        multiple={true}
        accept=".jpg,.png,.jpeg"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleNewFileUpload}
      />
    </div>
  );
}

export default DragAndDrop;
