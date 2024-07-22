import { fireEvent, render } from "@testing-library/react"
import Stopwatch from "../Stopwatch"
import { act } from "react-dom/test-utils"

beforeEach(() => {
    jest.useFakeTimers()
})
afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.clearAllTimers()
})

describe('Timer functionality', () => {
    test('Initial timer should be zero', () => {
        const { getByTestId } = render(<Stopwatch />);
        const timerEl = getByTestId('timer');
        expect(timerEl).toBeInTheDocument();
        expect(timerEl).toHaveTextContent('0')
    })

    test('start timer by one sec and timer should be one', () => {
        const { getByText, getByTestId } = render(<Stopwatch />);

        const startBtn = getByText(/start/i)
        fireEvent.click(startBtn)
        act(() => jest.advanceTimersByTime(1000))

        const timerEl = getByTestId('timer');
        expect(timerEl).toHaveTextContent('1')
    })

    test('stop timer should stop timer where it has', () => {
        const { getByText, getByTestId } = render(<Stopwatch />);

        const startBtn = getByText(/start/i)
        fireEvent.click(startBtn)
        act(() => jest.advanceTimersByTime(2000))

        const stopBtn = getByText(/stop/i)
        fireEvent.click(stopBtn)

        const timerEl = getByTestId('timer');
        expect(timerEl).toHaveTextContent('2')
    })

    test('Reset timer by zero/initial', () => {
        const { getByText, getByTestId } = render(<Stopwatch />);
        const startBtn = getByText(/start/i)
        fireEvent.click(startBtn)
        const timerEl = getByTestId('timer');
        act(() => jest.advanceTimersByTime(5000))
        expect(timerEl).toHaveTextContent('5')

        const resetBtn = getByText(/reset/i)
        fireEvent.click(resetBtn)
        expect(timerEl).toHaveTextContent('0')
    })
})