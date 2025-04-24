import React from 'react';
import { createRoot } from 'react-dom/client';
import VideoPlayer from './VideoPlayer';
import "./styles.css";

const mount = (el) => {
  const root = createRoot(el);
  root.render(<VideoPlayer url={"https://youtu.be/1I2bU5r3qIo?si=ME0xYogKWGIeDfgt"} />);
  return root;
};

// If we are in development and running in isolation,
// mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through the shell
export { mount }; 