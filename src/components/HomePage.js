import React from "react";
import "../style/styles.scss";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./SignupForm";

const HomePage = () => {
  return (
    <body>
      <div class="loader">
        <div class="loading-animation"></div>
      </div>
      <div class="navbar-container ">
        <nav
          id="navbar"
          class="navbar navbar-expand-lg justify-content-between navbar-light border-bottom-0 bg-white"
          data-sticky="top"
        >
          <div class="container">
            <div class="col flex-fill px-0 d-flex justify-content-between">
              <a
                id="logotext"
                class="navbar-brand mr-0 fade-page"
                href="localhost:3000"
              >
                Gambino
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target=".navbar-collapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  class="icon navbar-toggler-open"
                  src="/public/image/mobile-app.jpg"
                  alt="menu interface icon"
                  data-inject-svg
                />
                <img
                  class="icon navbar-toggler-close"
                  src="assets/img/icons/interface/cross.svg"
                  alt="cross interface icon"
                  data-inject-svg
                />
              </button>
            </div>
            <div class="collapse navbar-collapse col px-0 px-lg-2 flex-fill">
              <div class="py-2 py-lg-0">
                <ul id="menu" class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a
                      href="localhost:3000"
                      class="nav-link"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      HOME
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      href="localhost:3000"
                      class="nav-link"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      ABOUT
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      href="localhost:3000"
                      class="nav-link"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      SERVICES
                    </a>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      href="localhost:3000"
                      class="nav-link"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      CONTACT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              id="end"
              class="collapse navbar-collapse justify-content-end col flex-fill px-0"
            >
              <ModalLogin />
              <ModalSignup />
            </div>
          </div>
        </nav>
      </div>
      <section class="pb-0 pt-5 pt-lg-6">
        <div class="container border-bottom">
          <div class="row align-items-center justify-content-between">
            <div class="col-lg-6 col-xl-5 text-center px-md-6 px-lg-0">
              <p id="landing" class="display-4">
                An attractive landing for your mobile app.
              </p>
              <p class="lead">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div class="col-lg-6">
              <div class="row justify-content-center">
                <div class="col-lg-12 col-8 mt-4 mt-lg-0">
                  <img
                    id="mobile-image"
                    src="image/mobile-app.jpg"
                    alt="Image"
                    data-aos="fade-left"
                    class="img-responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="pb-4 bg-primary-3 text-light" id="footer">
        <div id="container" class="container">
          <div class="row mb-5">
            <div class="col-6 col-lg-3 col-xl-2">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a href="/" class="nav-link">
                    Home
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/" class="nav-link">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-6 col-lg">
              <ul class="list-unstyled">
                <li class="nav-item">
                  <a href="/" class="nav-link">
                    Service
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/" class="nav-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="row justify-content-center">
            <div id="copyright" class="col col-md-auto text-center">
              <small class="text-muted">
                &copy;2020 Gambino. All rights reserved.{" "}
                <a id="copyright" href="/">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a id="copyright" href="/">
                  Terms of Service.
                </a>
              </small>
            </div>
          </div>
        </div>
      </footer>
    </body>
  );
};

export default HomePage;

// <NavBarHome />
//       <div className="App">
//         <h1>Creating react modal</h1>
//         <SignupForm closeModal={closeModal} show={show} />
//       </div>
