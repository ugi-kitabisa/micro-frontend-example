import React, { useRef, useEffect } from 'react';
import { mount } from 'app3/Pembelian';

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};