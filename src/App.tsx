import React, { useState } from 'react';
import { Text, Box, useInput } from 'ink';

export const App = () => {
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  useInput((_input, key) => {
    if (key.leftArrow) setX(v => Math.max(1, v - 1));
    if (key.rightArrow) setX(v => Math.min(40, v + 1));
    if (key.upArrow) setY(v => Math.max(1, v - 1));
    if (key.downArrow) setY(v => Math.min(20, v + 1));
  });

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">Ink v7 + Xterm.js v6 in the browser</Text>
      <Text dimColor>Use arrow keys to move the cursor.</Text>
      <Box height={22} paddingLeft={x} paddingTop={y}>
        <Text color="green">^_^</Text>
      </Box>
    </Box>
  );
};
