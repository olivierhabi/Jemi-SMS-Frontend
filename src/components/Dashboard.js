import React from "react";
import "../style/classic.scss";
import { useSpring, animated } from "react-spring";

const Dashboard = () => (
  <div>
    <animated.div>
      <h1>Hello</h1>
    </animated.div>
    <p>Gambino form dashboard</p>
  </div>
);
export { Dashboard as default };

// import React, { PureComponent } from "react";
// import { Spring } from "react-spring/renderprops";

// class Loading extends PureComponent {
//   static style = ({ props }) => ({
//     border: "10px solid black",
//     borderRadius: "100%",
//     height: props.diameter,
//     left: "50%",
//     opacity: props.opacity,
//     position: "absolute",
//     top: "50%",
//     transform: "translateX(-50%) translateY(-50%)",
//     width: props.diameter,
//     zIndex: 1
//   });

//   handleRest = () => {
//     this.forceUpdate();
//   };

//   render() {
//     return (
//       <Spring
//         reset
//         from={{ opacity: 1, diameter: 0 }}
//         to={{ opacity: 0, diameter: 100 }}
//         onRest={this.handleRest}
//       >
//         {props => <div style={Loading.style({ props })} />}
//       </Spring>
//     );
//   }
// }

// export default Loading;
