import React from "react";
import {getSpaceUntilMaxLength} from "@testing-library/user-event/dist/utils";
import {Image} from "react-bootstrap";

function Logo() {
    return (
        <Image src={"/images/img.png"} alt="Logo" height={500}/>
    );
}

export default Logo;
