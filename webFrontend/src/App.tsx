import { accessTokenState } from "@global/atom";
import { STORAGE_ACCESS_KEY } from "@global/constants";
import localStorageFunc from "@global/utils/localStorage";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";

function App() {
  const setAccessToken = useSetRecoilState(accessTokenState);

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    const accessToken = String(e.data);
    setAccessToken(accessToken);
    localStorageFunc.set(STORAGE_ACCESS_KEY, accessToken);
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);

  return <Outlet />;
}

export default App;
