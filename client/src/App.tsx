import { AppRoutes } from './routes/routes';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      {/* Rotas */}
      <AppRoutes />
      <SpeedInsights />
    </>
  );
}

export default App;
