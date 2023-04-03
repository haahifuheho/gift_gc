import { Routes, Route } from "react-router-dom";
import Gifting from "./Gifting";
import Viewer from "./Viewer";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Gifting />} />
	<Route path="/Viewer" element={<Viewer />} />>
      </Routes>
  );
};

export default App;
