import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Button from "../../commonUI/button";
import SchemaDropdown from "../schemaDropdown";
import { v4 as uuidv4 } from "uuid";
import Input from "../../commonUI/input";

export default function SegmentPopup({
    state,
    handleSegmentPopup,
    handleSegnameChange,
    handleSaveSegment,
    schemaLegend,
    schemaOptions,
    schemaDropdownArr,
    getLabelForOption,
    addSchemaDropdown,
    updateSchemaDropdown
}) {

    const [schemaValue, setSchemaValue] = useState("");

    const handleUpdateOption = (value) => {
        setSchemaValue(value);
    }

    const handleAddSchema = async () => {
        if (schemaValue) {
            let schemaObj = {
                id: uuidv4(),
                value: schemaValue,
                label: await getLabelForOption(schemaValue)
            }
            addSchemaDropdown(schemaObj);
            setSchemaValue(""); // Reset dropdown value
        }
    }

    const updateSchemaValue = async (value, id) => {
        let label = await getLabelForOption(value);
        if (id && value) {
            const getUpdatedSchema = schemaDropdownArr?.map((item) => {
                if (id === item?.id) {
                    item.value = value;
                    item.label = label;
                }
                return item;
            });
            updateSchemaDropdown(getUpdatedSchema);
        }
    }

    const removeSchemaObj = async (id) => {
        if (id) {
            const getRemovedSchema = await schemaDropdownArr?.filter((item) => item?.id !== id);
            updateSchemaDropdown(getRemovedSchema);
        }
    }

    const getAvailableOptions = () => {
        return schemaOptions.filter(option => 
            !schemaDropdownArr.some(item => item.value === option.value)
        );
    }

    return (
        <section className="segment-popup">
            <div className="save-segment">
                <div className="header">
                    <FaAngleLeft size={30} color="white" onClick={handleSegmentPopup} className="cursor-pointer" />
                    <h1 className="mx-5">Saving Segment</h1>
                </div>
                <div className="body-content">
                    <p className="ml-15">Enter the Name of the Segment</p>
                    <Input type={"text"} placehodler={" Name of the segment"} handleChange={handleSegnameChange} styles={"w-80 input-field ml-15"} value={state?.segmentName} />
                    <p className="mr-18 ml-15">To save your segment, you need to add the schemas to build the query</p>
                    <div className="schema-legends">
                        {schemaLegend && schemaLegend.map((item, index) => {
                            return (
                                <div className="legend" key={index}>
                                    <span className="color-legend" style={{ backgroundColor: `${item?.color}` }}></span>
                                    <p className="label-legend">- {item?.label}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className={schemaDropdownArr?.length ? "schemas" : ""}>
                        {schemaDropdownArr.map((item, index) => {
                            return (
                                <SchemaDropdown
                                    options={schemaOptions}
                                    handleOption={updateSchemaValue}
                                    indicatorColor={index % 2 ? "#4FFFB0" : "red"}
                                    value={item?.value}
                                    id={item?.id}
                                    removeSchemaObj={removeSchemaObj}
                                    key={item?.id}
                                    styles={""}
                                />
                            )
                        })}
                    </div>
                    <SchemaDropdown
                        options={getAvailableOptions()}  // Use filtered options here
                        handleOption={handleUpdateOption}
                        indicatorColor={"lightgray"}
                        value={schemaValue}
                        removeSchemaObj={removeSchemaObj}
                        defaultContent={"Add schema to segment"}
                        styles={"ml-15"}
                    />
                    <div className="add-schema" onClick={() => handleAddSchema()} >
                        <span className="link-icon">+</span>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                        }} className="link text-link-green mb-height-11"> Add new schema</a>
                    </div>
                </div>
                <div className="footer">
                    <Button label={"Save the segment"} handleFunction={handleSaveSegment} value={schemaDropdownArr} styles={"bg-blue-aero text-white border-white btn"} />
                    <Button label={"Cancel"} handleFunction={handleSegmentPopup} styles={"bg-white text-red border-white btn"} />
                </div>
            </div>
        </section>
    )
}
