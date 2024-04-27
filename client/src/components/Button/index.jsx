import React from "react";

function Button(props) {
  if (props.href) {
    return (
      <a
        href={props.href}
        className="inline-block bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-lg md:mx-10"
      >
        {props.children}
      </a>
    );
  } else if (props.onClick) {
    return (
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg md:mx-10"
        onClick={props.onClick}
        data-id={props.id}
      >
        {props.children}
      </button>
    );
  }
}

export default Button;
