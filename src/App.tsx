import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

// Font Family "Lato"
import "@fontsource/lato";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App