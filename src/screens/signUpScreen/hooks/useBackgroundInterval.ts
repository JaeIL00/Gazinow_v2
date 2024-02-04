import { useEffect, useRef } from 'react';
import BackgroundTimer from 'react-native-background-timer';

const useBackgroundInterval = (callback: () => void, delay: number | null) => {
  const intervalRef = useRef<void>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = BackgroundTimer.runBackgroundTimer(() => callbackRef.current(), delay);
    }
    return () => BackgroundTimer.stopBackgroundTimer();
  }, [delay]);

  return intervalRef;
};

export default useBackgroundInterval;
