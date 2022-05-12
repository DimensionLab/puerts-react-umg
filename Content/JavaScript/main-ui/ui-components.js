"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBar = exports.Timer = exports.VectorEditable = exports.Vector = void 0;
const react_1 = require("react");
const React = require("react");
const react_umg_1 = require("react-umg");
let SlotOfProgressBar = {
    Size: {
        SizeRule: 1
    }
};
let TextStyle = {
    Size: 10,
};
function Vector(props) {
    const [slider, setSlider] = (0, react_1.useState)(0.5);
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
        props.actor.Bar(locArr[0] / 5, locArr[1] / 5, locArr[2] / 5);
        prevLocation = locArr;
    }, [slider]);
    return (React.createElement(react_umg_1.HorizontalBox, null,
        React.createElement(react_umg_1.TextBlock, { Font: TextStyle, Text: direction }),
        React.createElement(react_umg_1.Slider, { Value: slider, OnValueChanged: (val) => setSlider(val) }),
        React.createElement(react_umg_1.EditableTextBox, { Text: slider.toFixed(2).toString(), OnTextChanged: (val) => setSlider(Number(val)) })));
}
exports.Vector = Vector;
function VectorEditable(props) {
    const arr = Array.from(Array(props.dimension).keys());
    return (React.createElement(react_umg_1.HorizontalBox, null, arr.map((i) => React.createElement(Vector, { key: i, index: i, ...props }))));
}
exports.VectorEditable = VectorEditable;
function Timer() {
    const [count, setCount] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const id = setInterval(() => setCount(currCount => currCount + 1), 1000);
        return () => clearInterval(id);
    }, []);
    return React.createElement(react_umg_1.TextBlock, { Text: `${count}` });
}
exports.Timer = Timer;
const buttonTextures = [
    "Texture2D'/Game/StarterContent/Textures/ImageButtonNormal.ImageButtonNormal'",
    "Texture2D'/Game/StarterContent/Textures/ImageButtonActivated.ImageButtonActivated'"
];
function StatusBar(props) {
    if ((props.initialPercent || 0) < 0) {
        throw new Error('initialPercent < 0');
    }
    let [percent, setPercent] = (0, react_1.useState)(props.initialPercent || 0.5);
    const color = (0, react_1.useMemo)(() => ({ R: 1 - percent, G: 0, B: percent }), [percent]);
    function onIncrement() {
        if (percent < 1) {
            setPercent(percent => percent + 1);
        }
    }
    function onDecrement() {
        if (percent > 0) {
            setPercent(percent => percent - 1);
        }
    }
    return (React.createElement(react_umg_1.HorizontalBox, null,
        React.createElement(react_umg_1.TextBlock, { Text: `${props.name}(${percent.toFixed(2)})` }),
        React.createElement(react_umg_1.ProgressBar, { Percent: percent, Slot: SlotOfProgressBar, FillColorAndOpacity: color }),
        React.createElement(react_umg_1.Button, { OnClicked: onIncrement }, "+"),
        React.createElement(react_umg_1.Button, { OnClicked: onDecrement }, "-"),
        React.createElement(Timer, null)));
}
exports.StatusBar = StatusBar;
//# sourceMappingURL=ui-components.js.map