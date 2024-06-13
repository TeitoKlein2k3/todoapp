import { BallTriangle } from "react-loader-spinner";
import React from "react";
export default function Loading() {
    return (
        <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#10b981"
            ariaLabel="ball-triangle-loading"
            wrapperClass={"loading"}
            wrapperStyle={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
                alignItems: "center",
                justifyContent: "center",
            }}
        />
    );
}
