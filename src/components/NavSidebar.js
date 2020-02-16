import React from "react";

const NavSidebar = () => (
  <nav id="sidebar" class="sidebar">
    <div class="sidebar-content ">
      <a class="sidebar-brand" href="index.html">
        <i class="align-middle" data-feather="box"></i>
        <span class="align-middle">Gambino</span>
      </a>

      <ul class="sidebar-nav">
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">
              <button>+ Compose</button>
            </span>
          </a>
        </li>
        <li class="sidebar-header">My Account</li>
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">Account</span>
          </a>
        </li>
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">History</span>
          </a>
        </li>
        <li class="sidebar-header">Contacts and Groups</li>
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">Contacts</span>
          </a>
        </li>
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">Groups</span>
          </a>
        </li>
        <li class="sidebar-header">Messages</li>
        <li class="sidebar-item active">
          <a href="#dashboards" class="sidebar-link">
            <i class="align-middle" data-feather="sliders"></i>{" "}
            <span class="align-middle">Sent</span>
          </a>
        </li>
      </ul>

      <div class="sidebar-bottom d-none d-lg-block">
        <div class="media">
          <div class="media-body">
            <h5 class="mb-1">Chris Wood</h5>
            <div>
              <i class="fas fa-circle text-success"></i> Online
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default NavSidebar;
