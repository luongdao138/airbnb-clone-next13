import { useCallback, useState } from "react";

export function useToggle(initialState = false) {
  const [state, setState] = useState<boolean>(initialState);

  const open = useCallback(() => {
    setState(true);
  }, []);

  const close = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return {
    state,
    toggle,
    open,
    close,
    setState,
  };
}
