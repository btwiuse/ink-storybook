import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';

export const App = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color="green" bold>Ink v7 + xterm.js v6 in the browser</Text>
      <Text color="cyan">Tick: {tick}</Text>
    </Box>
  );
};
