import React from "react";
import { Link } from "react-router-dom";

const withLink = WrappedComponent => props => {
  const newProps = {
    ...props,
    video: {
      ...props.video,
      title: (
        <Link to={{ pathname: `/${props.video.id}`, autoplay: true }}>
          {props.video.title}
        </Link>
      )
    }
  };
  return <WrappedComponent {...newProps}></WrappedComponent>;
};

export default withLink;

// A higher order component is usefull when you want to reuse logic for other components.
// a HOC takes in a component as a parameter or returns a component , or does both
// in this case sending in a component and creating a new component from it with added functionality in the new component
// not (ever) modifying the original component that is being sent in as a param, what is returned is a new component
