import React from "react";
import "./App.scss";
import RouterChanel from "./Resources/RouterChanel";
import AOS from "aos";

function App() {
  AOS.init();
  return <RouterChanel />;
}

export default App;
