import React from "react";

const Type = ({ element, children, className }) => {
    switch (element) {
    case "h2": {
        return (
            <h2 className={className}>
                {children}
            </h2>
        );
    }
    case "h3": {
        return (
            <h3 className={className}>
                {children}
            </h3>
        );
    }
    case "p": {
        return (
            <p className={className}>
                {children}
            </p>
        );
    }
    case "span": {
        return (
            <span className={className}>
                {children}
            </span>
        )
    }
    }
};

export default Type;
