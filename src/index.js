import React from "react";
import { render } from "react-dom";
import { LiteYouTubeEmbed } from "./lib";

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <LiteYouTubeEmbed 
      id="puUPpVrIRkc"
      poster="maxresdefault"
      iFrameOptions={{ playsinline: 1 }}
      iFrameProps={{ id: 'hello-world' }}
      onIFrameAdded={() => {
        console.log('ready');
      }}
    />
  </div>
);

render(<App />, document.getElementById("root"));
