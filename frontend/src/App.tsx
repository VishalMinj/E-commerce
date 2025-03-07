import {router} from "./routes";
import { RouterProvider } from "@tanstack/react-router";
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
