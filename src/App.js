import React from 'react';
import DragAndDrop from './DragAndDrop';

export default function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, fileList: state.fileList.concat(action.files) };
      case 'REMOVE_FILE_FROM_LIST':
        console.log('state', state);
        console.log('action', action);
        let a = state.fileList.filter((t) => t.name !== action.name);
        console.log('a', a);
        return { ...state, fileList: a };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <DragAndDrop data={data} dispatch={dispatch} />
      <div>
        {Object.keys(data.fileList).length !== 0
          ? data.fileList.map((t, index) => (
              <div key={index} style={{ width: '400px', height: 'auto' }}>
                <img
                  src={URL.createObjectURL(t)}
                  alt="test"
                  style={{
                    objectFit: 'cover',
                    width: '400px',
                    maxHeight: '800px',
                  }}
                />
                <div>
                  <button>Download file</button>
                  <button
                    onClick={() =>
                      dispatch({ type: 'REMOVE_FILE_FROM_LIST', name: t.name })
                    }
                  >
                    Remove file
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
