import type { NavigateFunction } from "react-router";

let nFunction: NavigateFunction | null;

export const setNavigate = (navigate: NavigateFunction) => {
    nFunction = navigate;
    return true;
}

export const navigate = (to: string) => {
    if(nFunction) {
        nFunction(to);
    }
    
    return true;
}