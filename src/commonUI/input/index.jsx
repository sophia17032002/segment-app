import React from "react";

export default function Input({ type, placehodler, handleChange, styles, value }) {
    console.log("value of input", value)
    return (
        <input type={type} value={value} placeholder={placehodler} onChange={(e) => handleChange(e.target.value)} className={styles} />
    )
}