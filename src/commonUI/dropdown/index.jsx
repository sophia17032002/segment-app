import React from "react";
import { FaAngleDown } from "react-icons/fa";

export default function Dropdown({ options, handleOption, styles, defaultContent, value, id }) {
    return (
        <>
            <select className={styles} onChange={(e) => handleOption(e.target.value, id)} value={value}>
                {defaultContent && <option value={""} disabled > {defaultContent}</option>}
                {options && options.map((item, index) => {
                    return (
                        <option value={item?.value} key={index}>{item?.label}</option>
                    )
                })}
            </select >
            <FaAngleDown size={20} className="drowdown-arrow" />
        </>
    )
}