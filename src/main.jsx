import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { worker } from "./mocks/browsers";
import { RecoilRoot, useRecoilSnapshot } from "recoil";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

//service worker 실행파일
if (process.env.NODE_ENV === "development") {
  worker.start();
}

function DebugObserver() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
        console.debug("The following atoms were modified:");
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
            console.debug(node.key, snapshot.getLoadable(node));
        }
    }, [snapshot]);

    return null;
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RecoilRoot>
          <DebugObserver />
      <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </GoogleOAuthProvider>
      </RecoilRoot>
  </React.StrictMode>
)
