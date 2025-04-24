// langage: javascript
// filepath: efreiflix-shell/src/VueWrapper.jsx
import React, { useEffect, useRef } from "react";
import { createApp } from "vue";

const VueWrapper = ({ component: Component, componentProps = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const vueApp = createApp(Component, componentProps);
    vueApp.mount(containerRef.current);
    return () => vueApp.unmount();
  }, [Component, componentProps]);

  return <div ref={containerRef}></div>;
};

export default VueWrapper;