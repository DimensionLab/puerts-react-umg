import { useState, useCallback } from 'react';

import * as UE from 'ue'
import {$ref, $unref, $set, argv, on, toManualReleaseDelegate, releaseManualReleaseDelegate} from 'puerts';

import * as React from 'react';
import { TextBlock, EditableTextBox, VerticalBox, CanvasPanel, ReactUMG, CanvasPanelSlot, Button, HorizontalBox, TextureImage } from 'react-umg';
import { VectorEditable } from './ui-components'


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


function Main() {
    const [text, setText] = useState('First model');

    let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();
    let bpClass = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C')
    
    // From here you can access the blueprint class
    let bpActor = world.SpawnActor(bpClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.TestBlueprint_C;
    bpActor.Bar(1, 1, 1);
    bpActor.SetActorScale3D(new UE.Vector(7, 7, 7));	
    bpActor.K2_SetActorLocation(new UE.Vector(0,1,1), undefined, undefined, undefined);

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
