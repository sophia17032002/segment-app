import React, { useState } from "react";
import Segment from "../../components/segment";
import SegmentPopup from "../../components/segmentPopup";
import axios from "axios";

//legend information for schema
const schemaLegend = [
    {
        color: "#4FFFB0",
        label: "User Traits"
    },
    {
        color: "red",
        label: "Group Traits"
    }
]

//option for schema
const schemaOptions = [
    {
        label: "First Name",
        value: "first_name"
    },
    {
        label: "Last Name",
        value: "last_name"
    },
    {
        label: "Gender",
        value: "gender"
    },
    {
        label: "Age",
        value: "age"
    },
    {
        label: "Account Name",
        value: "account_name"
    },
    {
        label: "City",
        value: "city"
    },
    {
        label: "State",
        value: "state"
    },
]
export default function Home() {
    const [showSegmentPopup, setShowSegmentPopup] = useState(false);
    const [segmentName, setSegmentName] = useState("");
    const [schemaDropdownArr, setSchemaDropdownArr] = useState([]);

    const handleSegmentPopup = () => {
        setShowSegmentPopup((prev) => !prev)
    }
    const handleSegnameChange = (value) => {
        console.log(value)
        setSegmentName(value)
    }
    const getLabelForOption = async (value) => {
        const getLabel = await schemaOptions.find((item) => { return item?.value === value }) || "";
        return getLabel?.label
    }
    const addSchemaDropdown = (obj) => {
        setSchemaDropdownArr([...schemaDropdownArr, obj]);
        console.log(schemaDropdownArr)
    }
    const updateSchemaDropdown = (schema) => {
        setSchemaDropdownArr(schema)
    }
    const handleSaveSegment = async (value) => {
        let segmentData = {
            segment_name: segmentName,
            schema: []
        }
        schemaDropdownArr.map((item) => {
            let schemaObj = {};
            schemaObj[`${item?.value}`] = item?.label;
            segmentData?.schema?.push(schemaObj);
            return item;
        });
        console.log("segment data is: ", segmentData)
        await axios({
            url: "https://webhook.site/0238e94e-96cb-46e1-9259-1149342c7f63",
            method: "POST",
            data: segmentData
        });
        setSegmentName("");
        setSchemaDropdownArr([]);
    }
    const state = {
        showSegmentPopup,
        schemaDropdownArr,
        segmentName
    }
    return (
        <>
            <Segment handleSegmentPopup={handleSegmentPopup} state={state} />
            {showSegmentPopup && <SegmentPopup
                state={state}
                handleSegmentPopup={handleSegmentPopup}
                handleSegnameChange={handleSegnameChange}
                handleSaveSegment={handleSaveSegment}
                schemaLegend={schemaLegend}
                schemaOptions={schemaOptions}
                schemaDropdownArr={schemaDropdownArr}
                getLabelForOption={getLabelForOption}
                addSchemaDropdown={addSchemaDropdown}
                updateSchemaDropdown={updateSchemaDropdown}

            />}
        </>
    )
}