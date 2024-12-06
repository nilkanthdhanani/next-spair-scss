import React, { useEffect, useRef, useState } from "react";
import styles from "./videoPlayer.module.scss";
import Skeletons from "../skeleton";
import classNames from "classnames";
// const PauseIcon = "../assets/icons/pause.svg";
// const PlayIcon = "../assets/icons/play.svg";
// const MuteIcon = "../assets/icons/mute.svg";
// const UnMuteIcon = "../assets/icons/unmute.svg";

export default function VideoPlayer({
  url,
  keyProps,
  videoAutoPlay = true,
  showMute = true,
  showPlay = true,
  slidePageUrl = ""
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoAutoPlay) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", function () {
        setIsPlaying(false);
      });
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef?.current]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && videoRef.current.paused) {
        videoRef.current.play().catch((error) => { });
      } else {
        videoRef.current.pause();
      }
      setIsMuted(true);
    }
  }, [isPlaying]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const toggleMuteUnmute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted((prevIsMuted) => !prevIsMuted);
    }
  };
  const handleVideoLoad = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      if (isPlaying && videoRef.current.paused) {
        // console.log("im playing video loaded!")
        videoRef.current.play().catch((error) => { });
      } else {
        videoRef.current.pause();
      }
      setIsMuted(true);
    }
  };

  return (
    <div className={classNames(styles.videoPlayerWrapper)}>
      {!isLoaded && <Skeletons />}
      <video
        id={"videoId-" + keyProps}
        key={"video-" + keyProps}
        playsInline
        loop={videoAutoPlay}
        muted={isMuted}
        autoPlay={/iPad|iPhone|iPod/.test(navigator.userAgent) ? true : false}
        ref={videoRef}
        className={styles.videoPlayer}
        onLoadedData={handleVideoLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s",
          background: "#000101",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={url} />
        Sorry, your browser doesn't support embedded videos.
      </video>

      <div
        className={classNames(styles.actionButtonContainer, {
          [styles.customActionButtonContainer]: slidePageUrl,
        })}
      >
        {/* {showPlay && (
          <div className={styles.actionButtonAlignment}>
            <img
              onClick={togglePlayPause}
              src={isPlaying ? PauseIcon : PlayIcon}
              alt="PauseIcon"
            />
          </div>
        )} */}
        {/* {showMute && (
          <div className={styles.actionButtonAlignment}>
            <img
              onClick={toggleMuteUnmute}
              src={isMuted ? MuteIcon : UnMuteIcon}
              alt="MuteIcon"
            />
          </div>
        )} */}
      </div>
    </div>
  );
}




// how to use 
{/* <VideoPlayer url={mediaUrl} videoAutoPlay={isAutoplay} showMute={false} showPlay={showControls} /> */}
