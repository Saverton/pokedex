import React, { useState, useEffect } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play();
    });
  }, []);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, []);

  return [playing, toggle];
};

const BattleMusic = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>
        {playing ? "Pause Battle Music (I'm no fun)" : "Play Fun Battle Music"}
      </button>
    </div>
  );
};

export default BattleMusic;
