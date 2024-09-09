import React from "react";
import Button from "../../commonUI/button";
import { FaAngleLeft } from "react-icons/fa";

export default function Segment({ handleSegmentPopup, state }) {
    return (
        <section className="segment">
            <div className="segment-header">
                <FaAngleLeft size={30} color="white" />
                <h1 className="mx-5">View Audience</h1>
            </div>

            <Button label={"Save segment"} handleFunction={handleSegmentPopup} value={state?.showSegmentPopup} styles={"bg-blue-aero text-white border-white btn mt-20 ml-20"} />
        </section>
    )
}