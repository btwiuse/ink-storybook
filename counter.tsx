import React, {useState, useEffect} from 'react';
import { Text, Box } from 'ink';

interface CountownProps {
  children: React.ReactElement
  timer: number;
}

export const Countdown = ({children, timer = 3}: CountownProps) => {
	const [counter, setCounter] = useState(timer);

	useEffect(() => {
		setTimeout(() => {
			setCounter(previousCounter => {
        if (previousCounter === 0) return previousCounter;

        return previousCounter - 1
      })
		}, 1000);
	}, [counter]);

  if (counter === 0) {
    return <>{children}</>
  }

	return (
    <>
      <Box justifyContent="center" >
        <Text color="green" bold>Ink v3</Text>
      </Box>
      <Box justifyContent="center" >
        <Text color="blue" bold>Xterm.js</Text>
      </Box>
      <Box justifyContent="center" >
        <Text color="red">{counter}...</Text>
      </Box>
    </>
  )
};