// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Contains active configuration tree component.
// </summary>

import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2
} from '@angular/core';

@Component({
    selector: 'adm-act-item',
    templateUrl: './act-item.component.html',
    styleUrls: ['./act-item.component.scss']
})
export class ActItemComponent implements AfterViewInit
{
    @Input('type') type: boolean;
    @Input('data') data: number;
    @Input('name') name: string; // change to more complex, especially for condition
    @Input('selected') selected?: number;
    @Input('condPos') condPos: string;
    @Output() captured = new EventEmitter<number>();

    constructor(public renderer: Renderer2, public el: ElementRef) {}

    ngAfterViewInit()
    {
        if (this.type)
        {
            // TODO: ashof refactor while
            let levelNode = this.renderer.parentNode(this.el.nativeElement);
            while (!levelNode.className.includes('tree-node'))
            {
                levelNode = this.renderer.parentNode(levelNode);
            }

            if (levelNode)
            {
                this.renderer.addClass(levelNode, this.condPos);
                this.renderer.setAttribute(levelNode, 'data', '' + this.data); // pass to selection section mechanism
            }
        }
    }

    onCaptured(index)
    {
        this.captured.next(index);
    }
}
