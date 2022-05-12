import {useState,useMemo, useEffect} from 'react';
import React = require('react');

import { Slider, SlateFontInfo, Button, HorizontalBox, TextBlock, ProgressBar, HorizontalBoxSlot, LinearColor, EditableTextBox } from 'react-umg';
export interface Props {
    name: string;
    initialPercent?: number;
    key:number
}

interface State {
    percent: number;
}

let SlotOfProgressBar: HorizontalBoxSlot = {
    Size: {
        SizeRule: 1
    }
}

let TextStyle: SlateFontInfo = {
    Size: 10,
}

export interface VectorEditableProps {
    dimension: number,
    actor: any,
}
export interface VectorProps {
    index:number,
    dimension: number,
    actor: any,
}

export function Vector(props: VectorProps) {
    const [slider, setSlider] = useState(0.5);
    const direction = {
        [0]: "x",
        [1]: "y",
        [2]: "z",
    }[props.index];

    React.useEffect(() => {
        // need to rework, just for test
        let prevLocation = props.actor.K2_GetActorLocation();
        let locArr = [Number(prevLocation.X), Number(prevLocation.Y), Number(prevLocation.Z)];
        locArr[props.index] = Number(slider);
        props.actor.Bar(locArr[0]/5, locArr[1]/5, locArr[2]/5);
        prevLocation = locArr;
    }, [slider]);
    return (
        <HorizontalBox>
            <TextBlock Font={TextStyle} Text={direction} />
            <Slider Value={slider} OnValueChanged={(val) => setSlider(val)}/>
            <EditableTextBox Text={slider.toFixed(2).toString()} OnTextChanged={(val) => setSlider(Number(val))}/>
        </HorizontalBox>
    )
}

export function VectorEditable(props: VectorEditableProps) {
    const arr = Array.from(Array(props.dimension).keys())

    return (
        <HorizontalBox>
            {arr.map((i) => <Vector key={i} index={i} {...props} />)}
        </HorizontalBox>
    )
}


export function Timer() {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const id = setInterval(() => setCount(currCount => currCount + 1), 1000);
      return () => clearInterval(id);
    }, []);
  
    return <TextBlock Text={`${count}`}/>;
  }

const buttonTextures: string[] = [
    "Texture2D'/Game/StarterContent/Textures/ImageButtonNormal.ImageButtonNormal'",
    "Texture2D'/Game/StarterContent/Textures/ImageButtonActivated.ImageButtonActivated'"
];

export function StatusBar(props:Props) {
    if ((props.initialPercent || 0) < 0) {
        throw new Error('initialPercent < 0');
    }
    let [percent,setPercent] = useState(props.initialPercent || 0.5);
    const color = useMemo<LinearColor>(()=>({R:1-percent,G:0,B:percent}),[percent]);
    
    function onIncrement() {
        if(percent < 1){
            setPercent(percent => percent + 1);
        }
    }
    function onDecrement(){
        if(percent > 0) {
            setPercent(percent => percent-1);
        }
    }
    
    return (
        <HorizontalBox>
            <TextBlock Text={`${props.name}(${percent.toFixed(2)})`} />
            <ProgressBar Percent={percent} Slot={SlotOfProgressBar} FillColorAndOpacity={color}/>
            <Button OnClicked={onIncrement} >+</Button>
            <Button OnClicked={onDecrement} >-</Button>
            <Timer />
        </HorizontalBox>
    )
}