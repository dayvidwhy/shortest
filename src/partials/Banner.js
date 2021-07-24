import React from "react";
import Type from "@/components/Type.js";
import Link from "@/components/Link.js";

const Banner = () => {
    return (
        <header className="grid-fluid blue-bg">
            <div className="row center space">
                <Link destination="http://davidyoung.tech">
                    <Type className="banner-text banner-link" element="span">
                        Made by davidyoung.tech
                    </Type>
                </Link>
            </div>
        </header>
    );
};

export default Banner;
