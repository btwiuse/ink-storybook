import React, { useState } from 'react'
import { useInput, Box, Text } from 'ink'

export const App = () => {
  const [x, setX] = useState(1)
  const [y, setY] = useState(1)

  useInput((_input, key) => {
    if (key.leftArrow) setX((v) => Math.max(1, v - 1))
    if (key.rightArrow) setX((v) => Math.min(20, v + 1))
    if (key.upArrow) setY((v) => Math.max(1, v - 1))
    if (key.downArrow) setY((v) => Math.min(10, v + 1))
  })

  return (
    <Box flexDirection="column">
      <Text bold>Ink v7 + xterm.js v6 in browser</Text>
      <Text dimColor>Use arrow keys to move the face.</Text>
      <Box height={12} paddingLeft={x} paddingTop={y}>
        <Text color="green">^_^</Text>
      </Box>
    </Box>
  )
}
