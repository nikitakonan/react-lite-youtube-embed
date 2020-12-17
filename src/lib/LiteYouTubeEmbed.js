import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./LiteYouTubeEmbed.css";

const qsSerialize = (o = {}) => Object.keys(o)
  .map(i =>`${encodeURIComponent(i)}=${encodeURIComponent(o[i])}`)
  .join('&');

const LiteYouTubeEmbed = ({ 
  adNetwork, 
  id, 
  playlist, 
  poster, 
  title, 
  noCookie, 
  activatedClass, 
  iframeClass, 
  playerClass, 
  wrapperClass, 
  iFrameOptions, 
  iFrameProps, 
  onIFrameAdded
}) => {

  const [preconnected, setPreconnected] = useState(false);
  const [iframe, setIframe] = useState(false);
  const videoId = encodeURIComponent(id);
  const videoTitle = title;
  const posterUrl = `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`;
  const ytUrl = noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  const params = qsSerialize(iFrameOptions);
  const iframeSrc = !playlist
    ? `${ytUrl}/embed/${videoId}?autoplay=1${params ? `&${params}` : ''}`
    : `${ytUrl}/embed/videoseries?list=${videoId}${params ? `&${params}` : ''}`;

  const warmConnections = () => {
    if (preconnected) return;
    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;
    setIframe(true);
  };

  useEffect(() => {
    if (iframe && typeof onIFrameAdded === 'function') {
      onIFrameAdded();
    }
  }, [iframe, onIFrameAdded])

  return (
    <Fragment>
      <link rel="preload" href={posterUrl} as="image" />
      <>
      {preconnected && (
        <>
          <link rel="preconnect" href={ytUrl} />
          <link rel="preconnect" href="https://www.google.com" />
          {adNetwork && (
            <>
            <link rel="preconnect" href="https://static.doubleclick.net" />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
            </>
            ) 
          }
        </>
      )}
      </>
      <div
        onPointerOver={warmConnections}
        onClick={addIframe}
        className={`${wrapperClass} ${iframe && activatedClass}`}
        data-title={videoTitle}
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <div className={playerClass}></div>
        {iframe && (
          <iframe
            className={iframeClass}
            title={videoTitle}
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            src={iframeSrc}
            {...iFrameProps}
          ></iframe>
        )}
      </div>
    </Fragment>
  );
};

LiteYouTubeEmbed.propTypes = {
  adNetwork: PropTypes.bool,
  id: PropTypes.string,
  playlist: PropTypes.bool,
  poster: PropTypes.string,
  title: PropTypes.string,
  noCookie: PropTypes.bool,
  activatedClass: PropTypes.string,
  iframeClass: PropTypes.string,
  playerClass: PropTypes.string,
  wrapperClass: PropTypes.string,
  iFrameOptions: PropTypes.object,
  iFrameProps: PropTypes.object,
  onIFrameAdded: PropTypes.func,
};

LiteYouTubeEmbed.defaultProps = {
  adNetwork: true,
  id: "",
  playlist: false,
  poster: "hqdefault",
  title: "YouTube Embed",
  noCookie: false,
  activatedClass: "lyt-activated",
  iframeClass: "",
  playerClass: "lty-playbtn",
  wrapperClass: "yt-lite",
  iFrameOptions: {},
};

export default LiteYouTubeEmbed;