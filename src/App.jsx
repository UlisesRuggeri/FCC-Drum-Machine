import { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [audioName, setAudioName] = useState('');
  const [volume, setVolume] = useState(1);

  const audioRefs = {
    Q: useRef(null),
    W: useRef(null),
    E: useRef(null),
    A: useRef(null),
    S: useRef(null),
    D: useRef(null),
    Z: useRef(null),
    X: useRef(null),
    C: useRef(null),
  };

  const updateVolume = () => {
    Object.values(audioRefs).forEach(ref => {
      const audioElement = ref.current;
      if (audioElement) {
        audioElement.volume = volume;
      }
    });
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (audioRefs[key] && audioRefs[key].current) {
      const audioElement = audioRefs[key].current;
      audioElement.volume = volume;
      audioElement.play();
      setAudioName(key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [volume]);

  useEffect(() => {
    updateVolume();
  }, [volume]);

  return (
    <div id="drum-machine">
      <div id="container">
        {Object.keys(audioRefs).map(key => (
          <button
            key={key}
            className="drum-pad"
            id={key}
            onClick={() => {
              const audioElement = audioRefs[key].current;
              if (audioElement) {
                audioElement.volume = volume;
                audioElement.play();
                setAudioName(key);
              }
            }}
          >
            {key}
            <audio
              className="clip"
              id={key}
              src={`/sounds/${key}.mp3`}
              ref={audioRefs[key]}
            ></audio>
          </button>
        ))}
      </div>
    <div id="display"><h2>{audioName}</h2>      
    <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
      />
      
      </div>


    </div>
  );
};

export default App;
