import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Fullscreen, Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => setPlaying(!playing);
  const toggleMute = () => setMuted(!muted);

  const handleProgress = (state) => {
    setProgress(state.played);
  };

  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, "fraction");
    }
  };

  const handleFullScreen = () => {
    if (playerRef.current) {
      playerRef.current.wrapper.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full h-full mx-auto bg-black rounded-lg overflow-hidden">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <ReactPlayer
          className="absolute top-0 left-0"
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={setDuration}
          width="100%"
          height="100%"
          controls={false}
        />
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
        <div className="flex justify-between items-center mt-2">
          <button onClick={togglePlay} className="text-white p-2">
            {playing ? <Pause /> : <Play />}
          </button>
          <button onClick={toggleMute} className="text-white p-2">
            {muted || volume === 0 ? <VolumeX /> : <Volume2 />}
          </button>
          <button onClick={handleFullScreen} className="text-white p-2">
            <Fullscreen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
