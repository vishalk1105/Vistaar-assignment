import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./app/view/Home";
import LogIn from "./app/view/LogIn";

import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<LogIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
