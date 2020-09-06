import React, { useState } from "react";
import NodeLoader from 'react-loader-spinner'

import "./style.css";

interface LoaderPops {
    display: boolean;
}

type LoadingFunction = (...args: any[]) => any;


export const useLoading = (setLoading: any) => {
    return (f: LoadingFunction) => {
        return (...args: any[]) : any => {
            setLoading(true);
            f(...args);
            setLoading(false);
        }
    }
}

const Loader = ({ display }: LoaderPops) => {
    const classes = "overlay " + (display ? "display" : "");
    return (
        <div className={classes}>
            <div className="text">
                <NodeLoader
                    type={"Puff"}
                    color={"#00BFFF"}
                    height={100}
                    width={100}
                />
            </div>
        </div>
    );
};

export default Loader;
