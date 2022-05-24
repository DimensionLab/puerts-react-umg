import { useState, useCallback } from 'react';

import * as UE from 'ue'
import {$ref, $unref, $set, argv, on, toManualReleaseDelegate, releaseManualReleaseDelegate} from 'puerts';

import * as React from 'react';
import { TextBlock, EditableTextBox, VerticalBox, CanvasPanel, ReactUMG, CanvasPanelSlot, Button, HorizontalBox, TextureImage } from 'react-umg';
import { VectorEditable } from './ui-components'
import * as data from './004.json'

const scale = 50; 

let SlotOfVerticalBox: CanvasPanelSlot = {
    LayoutData: {
        Offsets: {
            Left: 120,
            Top: 120,
            Right: 480,
            Bottom: 80
        }
    }
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

const animate = async (d, RenderStruct, bpActor, index) => {
    let positions_array = UE.NewArray(UE.Vector);
    let triangles_array = UE.NewArray(UE.BuiltinInt);
    if (Object.entries(d).length > index) {
        let entry = Object.entries(d)[index]
        let key = entry[0]
        let value = entry[1]

        value['positions'].forEach((v, i) => {
            positions_array.Add(new UE.Vector(v[0] * scale, v[1] * scale, v[2] * scale));
        })
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
}


function Main() {
    const [text, setText] = useState('First model');

    let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();
    let bpClass = UE.Class.Load('/Game/StarterContent/MainRenderBP.MainRenderBP_C')
    
    // From here you can access the blueprint class
    let bpActor = world.SpawnActor(bpClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.MainRenderBP_C;
    bpActor.SetActorScale3D(new UE.Vector(7, 7, 7));	
    bpActor.K2_SetActorLocation(new UE.Vector(0,1,1), undefined, undefined, undefined);
    let RenderStruct = UE.UserDefinedStruct.Load("UserDefinedStruct'/Game/StarterContent/RenderStruct.RenderStruct'");
    let renderStruct = UE.NewStruct(RenderStruct) as UE.RenderStruct;
 
    let json_object = JSON.parse(JSON.stringify(data));

    animate(json_object, renderStruct, bpActor, 0)
    
    return (<CanvasPanel>
        <VerticalBox Slot={SlotOfVerticalBox}>
            <EditableTextBox Text={text} OnTextChanged={value=> setText(value)}/>
            <TextBlock Text={"Position"} />
            <VectorEditable dimension={3} actor={bpActor}/>
        </VerticalBox>
    </CanvasPanel>)
}

export function Load() {
    return ReactUMG.render(
        <Main />
    );
};
