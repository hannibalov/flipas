import React, { useState } from "react";
import AuthenticatedApp from "./Authenticated";
import { isLoggedIn, onUserLoggedIn } from "./firebase/providers";
import { Login } from "./layouts/Login";
import "./styles.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [isSignedIn, setIsSignedIn] = useState(isLoggedIn());
  onUserLoggedIn(setIsSignedIn);

  return isSignedIn ? (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedApp />
    </QueryClientProvider>
  ) : (
    <Login />
  );
}

export default App;
