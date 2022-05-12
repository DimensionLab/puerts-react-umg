"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load = void 0;
const react_1 = require("react");
const UE = require("ue");
const puerts_1 = require("puerts");
const React = require("react");
const react_umg_1 = require("react-umg");
const ui_components_1 = require("./ui-components");
let SlotOfVerticalBox = {
    LayoutData: {
        Offsets: {
            Left: 120,
            Top: 120,
            Right: 480,
            Bottom: 80
        }
    }
};
function Main() {
    const [text, setText] = (0, react_1.useState)('First model');
    let world = puerts_1.argv.getByName("GameInstance").GetWorld();
    let bpClass = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C');
    // From here you can access the blueprint class
    let bpActor = world.SpawnActor(bpClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
    bpActor.Bar(1, 1, 1);
    bpActor.SetActorScale3D(new UE.Vector(7, 7, 7));
    bpActor.K2_SetActorLocation(new UE.Vector(0, 1, 1), undefined, undefined, undefined);
    return (React.createElement(react_umg_1.CanvasPanel, null,
        React.createElement(react_umg_1.VerticalBox, { Slot: SlotOfVerticalBox },
            React.createElement(react_umg_1.EditableTextBox, { Text: text, OnTextChanged: value => setText(value) }),
            React.createElement(react_umg_1.TextBlock, { Text: "Position" }),
            React.createElement(ui_components_1.VectorEditable, { dimension: 3, actor: bpActor }))));
}
function Load() {
    return react_umg_1.ReactUMG.render(React.createElement(Main, null));
}
exports.Load = Load;
;
//# sourceMappingURL=index.js.map