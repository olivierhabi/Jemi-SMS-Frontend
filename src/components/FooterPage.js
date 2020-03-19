import React from "react";

const FooterPage = () => (
  <footer class="footer">
    <div class="container-fluid">
      <div class="row text-muted">
        <div class="col-6 text-left">
          <ul class="list-inline">
            <li class="list-inline-item">
              <a class="text-muted" href="/">
                Support
              </a>
            </li>
            <li class="list-inline-item">
              <a class="text-muted" href="/">
                Help Center
              </a>
            </li>
            <li class="list-inline-item">
              <a class="text-muted" href="/">
                Privacy
              </a>
            </li>
            <li class="list-inline-item">
              <a class="text-muted" href="/">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div class="col-6 text-right">
          <p class="mb-0">
            &copy; 2020 -{" "}
            <a href="/" class="text-muted">
              Gambino
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterPage;
