import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faInbox,
  faAddressBook,
  faIdCardAlt,
  faUser,
  faHistory,
  faCalendarCheck,
  faFileImport
} from "@fortawesome/free-solid-svg-icons";

const NavSidebar = () => (
  <nav id="sidebar" class="sidebar">
    <div class="sidebar-content ">
      <a class="sidebar-brand" href="index.html">
        <i class="align-middle" data-feather="box"></i>
        <span class="align-middle">Gambino</span>
      </a>

      <ul class="sidebar-nav">
        <li id="sidebar-title" class="sidebar-header">
          Messages
        </li>
        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/message"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faEnvelope} />+ Messages
            </NavLink>
          </span>
        </li>
        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/import"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faFileImport} />
              Import
            </NavLink>
          </span>
        </li>

        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/messages"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faInbox} />
              Sent
            </NavLink>
          </span>
        </li>
        <li id="sidebar-title" class="sidebar-header">
          My Account
        </li>
        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/account"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faUser} />
              Account
            </NavLink>
          </span>
        </li>
        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/history"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faHistory} />
              History
            </NavLink>
          </span>
        </li>
        <li id="sidebar-title" class="sidebar-header">
          Contacts and Schedule
        </li>
        <li class="sidebar-item active">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/contact"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faAddressBook} />
              Contacts
            </NavLink>
          </span>
        </li>
        <li class="sidebar-item active">
          <span id="align-active" class="align-middle">
            <NavLink
              id="active-hover"
              to="/contacts"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faIdCardAlt} />
              Saved Contacts
            </NavLink>
          </span>
        </li>
        <li class="sidebar-item">
          <span class="align-middle">
            <NavLink
              id="active-hover"
              to="/schedule"
              activeClassName="is-active"
              className="sidebar-link"
              exact={true}
            >
              <FontAwesomeIcon id="favicon" icon={faCalendarCheck} />
              Schedule
            </NavLink>
          </span>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavSidebar;
