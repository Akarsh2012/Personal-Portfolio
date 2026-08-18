import React, { useState, useEffect, lazy, Suspense } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import OnePage from "./components/OnePage";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
/* Trimmed Bootstrap build — see bootstrap-custom.scss. Kept last, which
   is exactly where the full bootstrap.min.css sat, so cascade order and
   therefore appearance are unchanged. */
import "./bootstrap-custom.scss";

/*
 * Home stays in the main bundle — it is what almost every visitor
 * lands on, so splitting it would only add a round trip. Every other
 * route is fetched on demand.
 *
 * This matters most for /resume, which pulls in the PDF renderer, and
 * for /about, which pulls the GitHub contribution calendar. Neither
 * has any business loading for someone who never visits those pages.
 */
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Blog = lazy(() => import("./components/Blog/Blog"));
const BlogPost = lazy(() => import("./components/Blog/BlogPost"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

/* Reuses the existing preloader artwork so a route fetch looks
   identical to the initial load. Uses a class rather than the
   preloader's id, since the initial preloader may still be mounted
   and two elements must not share an id. */
function RouteFallback() {
  return <div className="route-preloader" />;
}

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            {/* "/" is the single scrolling page. The standalone routes
                below are kept so deep links, the sitemap and anyone
                arriving from search still land on a real page. */}
            <Route path="/" element={<OnePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
