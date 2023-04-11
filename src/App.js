import { Routes, Route } from "react-router-dom";
import Gifting from "./Gifting";
import Viewer from "./Viewer";
import Viewer2 from "./Viewer2";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Gifting />} />
	      <Route path="/Viewer" element={<Viewer />} />
        <Route path="/Viewer2" element={<Viewer2 />} />>
      </Routes>
  );
};

export default App;
