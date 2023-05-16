import { useState } from "react";

interface Props {
  fn: Function;
  delay: number;
}
const useThrottle = ({ fn, delay }: Props) => {
  const [throttle, setThrottle] = useState(false);

  const throttledFn = () => {
    let onThrottle = throttle;
    if (!onThrottle) {
      fn();
      onThrottle = true;
      setThrottle(true);
      setTimeout(() => {
        onThrottle = false;
        setThrottle(false);
      }, delay);
    }
  };

  return throttledFn;
};

export default useThrottle;
