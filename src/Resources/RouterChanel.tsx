import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import Investor from "./Pages/Investor";
import StartUp from "./Pages/StartUp";
import FooterBar from "./Panels/FooterBar";
import NavigationBar from "./Panels/NavigationBar";
import { ToastContainer } from "react-toastify";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import PolicyPage from "./Pages/Policy";
import ComingSoon from "./Panels/ComingSoon";
import { default as whatsapp } from "../assets/icons/whatsapp_icon.svg";
import Blogs from "./Pages/Blogs";
const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
function RouterChanel() {
  return (
    <HashRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // theme="colored"
        pauseOnHover
      />
      <NavigationBar />
      <ScrollToTop>
        <Routes>
          <Route path="" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="investor" element={<Investor />} />
          <Route path="startup" element={<StartUp />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="policy" element={<PolicyPage />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </ScrollToTop>

      <FooterBar />
      <a className="support" href="" target="_blank" rel="noreferrer">
        <img src={whatsapp} className="cursor-pointer" alt="" />
        <p className="text-white">help & Support</p>
      </a>
    </HashRouter>
  );
}

export default RouterChanel;
