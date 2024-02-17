import { STORAGE_ACCESS_KEY } from "@global/constants";
import localStorageFunc from "@global/utils/localStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    localStorageFunc.set(STORAGE_ACCESS_KEY, String(e.data));
  };
  window.addEventListener("message", onMessageEvent, { capture: true });
  useEffect(() => {
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
