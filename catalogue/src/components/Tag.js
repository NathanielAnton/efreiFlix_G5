import React from "react";

const Tag = ({ children }) => {
    return (
        <li className="flex px-1.5 py-0.5 rounded-md border border-solid border-gray-400 bg-gray-300 text-gray-700">
            {children}
        </li>
    );
};

export default Tag;