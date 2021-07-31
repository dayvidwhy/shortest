import React from "react";
import { Global, css } from '@emotion/react'

import Banner from "@/partials/Banner.js";
import Main from "@/partials/Main.js";
import Footer from "@/partials/Footer.js";

const App = () => {
    return (
        <>
            <Global
                styles={css`
                html {
                    font-family: sans-serif;
                    background-color: #2980b9;
                }

                /*reset body css*/
                body {
                    margin: 0;
                    padding: 0;
                }
                `}
            />
            <Banner />
            <Main />
            <Footer />
        </>
    );
};

export default App;
