import { Box, Button, Typography } from '@mui/material'
import React, { Component } from 'react'
import { styles } from './Styles';

interface IState {
    timer: number;
    isStarted: boolean;
    isStopped: boolean;
    isRestarted: boolean;
}

class Stopwatch extends Component<{}, IState> {
    private timerId: NodeJS.Timeout
    constructor(props: {}) {
        super(props)
        this.state = { timer: 0, isStarted: false, isStopped: false, isRestarted: false }
        this.timerId = setTimeout(() => { }, 1000)
    }

    handleStart = () => {
        this.setState({ isStarted: true, isStopped: false })
        this.timerId = setInterval(() => {
            this.setState(prevState => ({ timer: prevState.timer + 1 }))
        }, 1000)
    };

    handleStop = () => {
        this.setState({ isStopped: true, isStarted: false })
        clearInterval(this.timerId)
    };

    handleReset = () => {
        this.setState({ timer: 0, isStarted: false, })
        clearInterval(this.timerId)
    };

    componentWillUnmount(): void {
        clearInterval(this.timerId)
    }

    render() {
        const { timer, isStarted, isStopped } = this.state
        return (
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3} height={'100vh'}>
                <Typography fontSize={30} data-testid='timer'>{timer}</Typography>
                <Box display={'flex'} alignItems={'center'} gap={2}>
                    <Button
                        variant='outlined'
                        color='warning'
                        disabled={timer === 0}
                        onClick={this.handleReset}
                        sx={styles.buttons}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        disabled={isStarted}
                        onClick={this.handleStart}
                        sx={styles.buttons}
                    >
                        Start
                    </Button>
                    <Button
                        variant='contained'
                        color='error'
                        disabled={isStopped || timer === 0}
                        onClick={this.handleStop}
                        sx={styles.buttons}
                    >
                        Stop
                    </Button>
                </Box>
            </Box>
        )
    }
}
export default Stopwatch
