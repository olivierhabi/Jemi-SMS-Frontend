// import React, { Component } from "react";
// import getToken from "../helpers/jwt";
// import API from "../components/Api";
// import { withRouter } from "react-router-dom";

// class Authenticated extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: undefined
//     };
//   }
//   componentDidMount() {
//     const token = getToken();
//     if (!token) {
//       this.props.history.push("/signin");
//     }

//     API.get("/account", {
//       headers: { Authorization: token }
//     })
//       .then(res => this.setState({ user: res.data }))
//       .catch(err => {
//         localStorage.removeItem("auth-token");
//         this.props.history.push("/signin");
//       });
//   }
//   render() {
//     if (this.state.user === undefined) {
//       return (
//         <div>
//           <h1>Loading.....</h1>
//         </div>
//       );
//     }
//     return <div>{this.props.children}</div>;
//   }
// }
// export default withRouter(Authenticated);

// import React, { useState, useEffect } from "react";
// import getToken from "../helpers/jwt";
// import API from "../components/Api";
// import { useHistory } from "react-router-dom";

// const Authenticated = props => {
//   const [user, setUser] = useState({ user: undefined });
//   const history = useHistory();

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       history.push("/signin");
//     }

//     API.get("/account", {
//       headers: { Authorization: token }
//     })
//       .then(res => setUser({ user: res.data }, console.log(res.data)))
//       .catch(err => {
//         localStorage.removeItem("auth-token");
//         history.push("/signin");
//       });
//   });
//   if (user === undefined) {
//     console.log("loading");
//     return (
//       <div>
//         <h1>Loading.....</h1>
//       </div>
//     );
//   }
//   return <div>{props.children}</div>;
// };
// export default Authenticated;
