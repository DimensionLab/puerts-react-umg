import { useState, useCallback } from 'react';

import * as UE from 'ue'
import {$ref, $unref, $set, argv, on, toManualReleaseDelegate, releaseManualReleaseDelegate} from 'puerts';

import * as React from 'react';
import { TextBlock, EditableTextBox, VerticalBox, CanvasPanel, ReactUMG, CanvasPanelSlot, Button, HorizontalBox, TextureImage } from 'react-umg';
import { VectorEditable } from './ui-components'
import * as data from './004.json'

let obj = new UE.MainObject();

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

const animate = async (d, testStruct, bpActor, index) => {
    let positions_array = UE.NewArray(UE.Vector);
    let triangles_array = UE.NewArray(UE.BuiltinInt);
    if (Object.entries(d).length > index) {
        let entry = Object.entries(d)[index]
        let key = entry[0]
        let value = entry[1]

        value['positions'].forEach((v, i) => {
            positions_array.Add(new UE.Vector(v[0] * 100, v[1] * 100, v[2] * 100));
        })
        value['faces'].forEach((v, i) => {
            v.forEach((g) => {
                triangles_array.Add(g);
            });
        });
  
        sleep(40).then(() => {
            testStruct.MyArray = positions_array;
            testStruct.Triangles = triangles_array;
            let incr = index + 1;
            bpActor.Render(testStruct);

            animate(d, testStruct, bpActor, incr);
        });
    }
}


function Main() {
    const [text, setText] = useState('First model');

    let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();
    let bpClass = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C')
    
    // From here you can access the blueprint class
    let bpActor = world.SpawnActor(bpClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.TestBlueprint_C;
    bpActor.SetActorScale3D(new UE.Vector(7, 7, 7));	
    bpActor.K2_SetActorLocation(new UE.Vector(0,1,1), undefined, undefined, undefined);
    let TestStruct = UE.UserDefinedStruct.Load("UserDefinedStruct'/Game/StarterContent/TestStruct.TestStruct'");
    let testStruct = UE.NewStruct(TestStruct) as UE.TestStruct;
 
    let json_object = JSON.parse(JSON.stringify(data));

    animate(json_object, testStruct, bpActor, 0)
    
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
