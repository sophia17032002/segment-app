import React from "react";

export default function Button({ label, handleFunction, value, styles }) {
    const handleClick = () => {
        value ? handleFunction(value) : handleFunction();
    }
    return (
        <>
            <button className={`${styles}`} onClick={() => handleClick()}>{label}</button>
        </>
    )
}