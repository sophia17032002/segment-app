import React from "react";
import Dropdown from "../../commonUI/dropdown";
import { FaMinus } from "react-icons/fa";

export default function SchemaDropdown({ options, handleOption, indicatorColor, value, id = "", removeSchemaObj, keyValue, defaultContent = "", styles }) {

    return (
        <section className={`schema-dropdown ${styles}`} key={keyValue}>
            <span style={{ backgroundColor: indicatorColor }} className="legend-indicator"></span>
            <Dropdown
                options={options}
                handleOption={handleOption}
                styles={"dropdown"}
                defaultContent={defaultContent}
                value={value}
                id={id}
            />
            <FaMinus size={20} color="gray" className="remove-dropdown cursor-pointer" onClick={() => removeSchemaObj(id)} />
        </section>
    )
}