import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AddArticle from "./pages/AddArticle";
import ViewArticle from "./pages/ViewArticle";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ajouter-article" element={<AddArticle />} />
          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path="/a-propos" element={<About />} />
        </Routes>
    </Router>
  );
}

export default App;