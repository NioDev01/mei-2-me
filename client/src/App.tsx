import { Toaster } from "sonner";
import { AppRoutes } from "./routes/routes";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      {/* Rotas */}
      <Toaster />
      <AppRoutes />
      <SpeedInsights />
    </>
  );
}

export default App;
