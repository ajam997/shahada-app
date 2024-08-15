import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

const AudioVisualizer = ({ audioStream }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    if (!audioStream) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      height: 100,
      normalize: true,
    });

    wavesurfer.loadBlob(new Blob([audioStream], { type: 'audio/wav' }));

    return () => wavesurfer.destroy();
  }, [audioStream]);

  return <div ref={waveformRef} id="waveform" />;
};

export default AudioVisualizer;
