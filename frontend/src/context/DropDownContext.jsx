import React, { useState } from 'react';


export function deepFreeze(obj) {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
}

let initialContext = {
    data: {
        scale: 2
    },
    setData: (object) => {}
}
const DropDownContext = React.createContext(initialContext);

export function DropDownContextProvider(props) {


    const [data, mSetData] = useState(initialContext.data);

    const setData = (mData) => mSetData(deepFreeze(mData));
    return (
        < DropDownContext.Provider value={{
            data: data,
            setData: setData
        }}>
            {props.children}
        </ DropDownContext.Provider>
    );
}

export default DropDownContextProvider;
export { DropDownContext };