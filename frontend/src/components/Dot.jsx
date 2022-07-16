import React, {useEffect, useState} from "react";
let Dot = (props)=>{
    const [myStyle, setMyStyle] = useState({
        top: "57%",
        left: "50%",
        backgroundColor: props.color
    })
    const [update, callUpdate] = useState(0)
    const [scale, setScale] = useState(2)
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    const [showModal, setScowModal] = useState(false)
    useEffect(()=>{
        let top = (props.startX  + props.scrollY*350)*scale + 57;   //todo одобрать коэффциенты и посчитать по тригонометрическим правилам
        let left =(props.scrollY + props.scrollX*350)*scale + 50;
        setMyStyle({
            top: top+"%",
            left: left+"%",
            backgroundColor: props.color
        })
    }, [props])

    useEffect(()=>{
        setTimeout(()=>{
            let scale = +getCookie("scale")/2
            setScale(scale)
            callUpdate(update+1)
        }, 1000)
    }, [update])

    return <><div className={"dot"} style={myStyle} onClick={()=>{setScowModal(true)}}>
    </div>
        {showModal && <div className={"data_modal"} onClick={()=>{setScowModal(false)}} style={myStyle}>
            {JSON.stringify(props)}
        </div>}</>
}
export default Dot