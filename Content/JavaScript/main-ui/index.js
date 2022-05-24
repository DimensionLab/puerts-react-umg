"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load = void 0;
const react_1 = require("react");
const UE = require("ue");
const puerts_1 = require("puerts");
const React = require("react");
const react_umg_1 = require("react-umg");
const ui_components_1 = require("./ui-components");
const data = require("./004.json");
const scale = 50;
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
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};
const animate = async (d, RenderStruct, bpActor, index) => {
    let positions_array = UE.NewArray(UE.Vector);
    let triangles_array = UE.NewArray(UE.BuiltinInt);
    if (Object.entries(d).length > index) {
        let entry = Object.entries(d)[index];
        let key = entry[0];
        let value = entry[1];
        value['positions'].forEach((v, i) => {
            positions_array.Add(new UE.Vector(v[0] * scale, v[1] * scale, v[2] * scale));
        });
        value['faces'].forEach((v, i) => {
            v.forEach((g) => {
                triangles_array.Add(g);
            });
        });
        sleep(20).then(() => {
            RenderStruct.MyArray = positions_array;
            RenderStruct.Triangles = triangles_array;
            let incr = index + 1;
            bpActor.Render(RenderStruct);
            animate(d, RenderStruct, bpActor, incr);
        });
    }
};
function Main() {
    const [text, setText] = (0, react_1.useState)('First model');
    let world = puerts_1.argv.getByName("GameInstance").GetWorld();
    let bpClass = UE.Class.Load('/Game/StarterContent/MainRenderBP.MainRenderBP_C');
    // From here you can access the blueprint class
    let bpActor = world.SpawnActor(bpClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
    bpActor.SetActorScale3D(new UE.Vector(7, 7, 7));
    bpActor.K2_SetActorLocation(new UE.Vector(0, 1, 1), undefined, undefined, undefined);
    let RenderStruct = UE.UserDefinedStruct.Load("UserDefinedStruct'/Game/StarterContent/RenderStruct.RenderStruct'");
    let renderStruct = UE.NewStruct(RenderStruct);
    let json_object = JSON.parse(JSON.stringify(data));
    animate(json_object, renderStruct, bpActor, 0);
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