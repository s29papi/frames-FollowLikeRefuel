// sharedData.js
import { useState } from 'react';

export const useSharedData = () => {
  const [sharedData, setSharedData] = useState({});

  return { sharedData, setSharedData };
};