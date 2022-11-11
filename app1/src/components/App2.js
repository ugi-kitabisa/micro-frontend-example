import { mount } from "app2/App";
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useNavigate();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: window.location.pathname,
    });

    history(onParentNavigate);
  }, []);

  return <div ref={ref} id="app2" />;
};
