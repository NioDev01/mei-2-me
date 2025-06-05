import { MessageForm } from "./pages/message";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Toaster position="top-center" />
      <MessageForm />
    </div>
  );
}

export default App