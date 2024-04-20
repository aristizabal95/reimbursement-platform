import React, { useEffect, useState } from "react";

export const fetchData = async (path, setter) => {
    try {
        const data = await fetch(path);
        const resp = await data.json();
        setter(resp);
    } catch (error) {
        console.log(`Error while loading data from ${path}`, error)
    }
}


