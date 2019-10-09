// <copyright company="Softerra">
//    Copyright (c) Softerra, Ltd. All rights reserved.
// </copyright>
//
// <summary>
//    Represents a container for property editor.
//  Has following modes that set by admEditorContainerLayout attribute:
//  - row - on small/medium screen the label and content block combined inline, on other screens - in column.
//  - floated - label with floating, childrens combined in column.
//  - column - label without floating, childrens combined in column.
// </summary>

import {AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Observable} from "rxjs/index";


//  restrict: 'E',
//  require: ['?^admEditorContainerLayout', '?^admEditorContainerClass'],
//  controller: 'EditorContainerController',
//  compile: compileDirective

@Component({
  selector: 'app-editor-container', // admEditorContainer
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss']
})
export class EditorContainerComponent implements OnInit, OnDestroy, AfterContentInit {

  title = 'test';

  UNDERLINED_INPUT_TYPES = [undefined, 'text', 'password'];
  labelElement;
  editorElement;
  ngMessagesElement;

  // Define default layout class.
  defaultLayoutClass = 'editor-container--column';
  cleanupItems = [];

  layoutChangeEvent;
  layoutClass;


  // @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.compileDirective();
    this.EditorContainerController();
    this.linkDirective();

    //layout
    this.layoutChangeEvent = new Observable();

    // if attributes started with {{ - observe changes, skip for now.
    // this.initLayoutObservers();
  }

  /*
  * @name admEditorContainer
  * @desc Represents a container for property editor.
  */

    // This input types we marked as underlined input.

    compileDirective()
    {

      // this.el.nativeElement.addClass('editor-container animatable');
      this.renderer.addClass(this.el.nativeElement, 'editor-container');
      this.renderer.addClass(this.el.nativeElement, 'animatable');



      const elementChildrens = this.el.nativeElement.children;
      if (elementChildrens.length > 3)
      {
        throw Error('Editor container cannot contain more that 3 elements.');
      }
      // Do nothing for empty container.
      if (elementChildrens.length === 0)
      {
        return;
      }


      // Initialize childlers,
      for (let i = 0; i < elementChildrens.length; i++)
      {
        const elementChildren = elementChildrens[i];
        if (elementChildren.tagName === 'LABEL')
        {
          // this.labelElement = angular.element(elementChildren);
          this.labelElement = elementChildren;

          // Mark first immediate label as label element.
          // this.labelElement.addClass('editor-container__label');
          this.renderer.addClass(this.labelElement, 'editor-container__label');
          continue;
        }

        if (elementChildren.getAttribute('ng-model'))
        {
          // this.editorElement = angular.element(elementChildren);
          this.editorElement = elementChildren;

          this.applyEditorAttributes(this.editorElement);

          // Generate editor id and link label with editor.
          if (this.labelElement)
          {
            // Generate editor id if necessary.
            // if (!this.editorElement.attr('id'))
            if (!this.editorElement.getAttribute('id'))
            {
              // Generate and set new id for editor.
              // this.editorElement.attr('id', 'editor_' + 33); // set random $mdUtil.nextUid()
              this.renderer.setAttribute(this.editorElement, 'id', 'editor_33'); // set random $mdUtil.nextUid()
            }
            // Set link between label and editor element.
            // this.labelElement.attr('for', this.editorElement.attr('id'));
            this.renderer.setAttribute(this.labelElement, 'for', this.editorElement.getAttribute('id')); // set random $mdUtil.nextUid()
          }
          continue;
        }

        // this.ngMessagesElement = angular.element(elementChildren);
        this.ngMessagesElement = elementChildren;
      }

      this.wrapEditorAndMessages();

      // return linkDirective;
    }


    applyEditorAttributes(editorElement)
    {
      // Mark editor element with adapter.
      // editorElement.attr('adm-editor-container-adapter', '');
      this.renderer.setAttribute(editorElement, 'adm-editor-container-adapter', '');


      // Mark input editor as underlined element.
      if (editorElement.tagName === 'INPUT')
      {
         // const inputType = editorElement.attr('type');
        const inputType = this.editorElement.getAttribute('type');

        if (this.UNDERLINED_INPUT_TYPES.indexOf(inputType) !== -1)
        {
          // editorElement.attr('adm-underlined-input', '');
          this.renderer.setAttribute(editorElement, 'adm-underlined-input', '');
        }
      }
    }

    wrapEditorAndMessages()
    {
      // var containerContentElement = angular.element('<div>');
      const containerContentElement = this.renderer.createElement('div');

      // containerContentElement.addClass('editor-container__content');
      this.renderer.addClass(containerContentElement, 'editor-container__content');

      // Replace editor element to container.
      if (this.editorElement)
      {

        // this.editorElement.detach(); // TODO

        containerContentElement.append(this.editorElement);
      }
      // Replace ngMessages element to container
      if (this.ngMessagesElement)
      {
        // this.ngMessagesElement.detach(); // TODO
        containerContentElement.append(this.ngMessagesElement);
      }

      this.el.nativeElement.append(containerContentElement);
    }

    linkDirective() // scope, element, attrs, ctrls
    {
      // var editorContainerLayoutCtrl = ctrls[0];
      // var editorContainerClassCtrl = ctrls[1];

      const editorContainerLayoutCtrl = null;
      const editorContainerClassCtrl = null;


      if (this.el.nativeElement.getAttribute("adm-editor-container-layout-sm"))
      {
        this.updateElementLayoutClass(this.getLayoutClass(true));

        // Listen layout class changing.
        // this.cleanupItems.push(this.layoutChangeEvent.observe(function()
          // {
            // this.updateElementLayoutClass(this.getLayoutClass(true));
          // }));
      }
      else
      {
        this.updateElementLayoutClass(undefined);
      }

      if (this.el.nativeElement.getAttribute("adm-editor-container-class"))
      {
        this.updateElementClass(null, this.el.nativeElement.getAttribute("adm-editor-container-class"));
      }

      // adapter
      // find child with attribute adm-editor-container-adapter and
      const adapterElements = this.el.nativeElement.querySelector('adm-editor-container-adapter');
      adapterElements.forEach(adapterEl => adapterEl.addClass('editor-container--' + adapterEl.tagName));
      // var editorTagName = element[0].tagName.toLowerCase();
      // editorContainerCtrl.element.addClass('editor-container--' + editorTagName);
    }


  ngOnDestroy(){
      this.cleanupItems.forEach((cleanupItem) => { cleanupItem(); });
  }

  updateElementLayoutClass(layoutClass)
  {
    const LAYOUT_CLASSES = [
      'editor-container--column',
      'editor-container--column-lg',
      'editor-container--column-sm',
      'editor-container--floated',
      'editor-container--floated-lg',
      'editor-container--floated-sm'
    ];

    // Remove all layout classes.
    // this.el.nativeElement.removeClass(LAYOUT_CLASSES.join(' '));
    // this.renderer.removeClass(this.el.nativeElement, LAYOUT_CLASSES.join(' ')); // multiple
    LAYOUT_CLASSES.forEach((lclass) => {
      this.renderer.removeClass(this.el.nativeElement, lclass); // multiple
    });

    // Apply layout class.
    // this.el.nativeElement.addClass(layoutClass || this.defaultLayoutClass);
    // this.renderer.addClass(this.el.nativeElement, layoutClass || this.defaultLayoutClass);

    if(layoutClass){
      layoutClass.split(' ').forEach((cName) => {
        this.renderer.addClass(this.el.nativeElement, cName);
      });

    } else {
      this.renderer.addClass(this.el.nativeElement, this.defaultLayoutClass);
    }
  }

  updateElementClass(classesToRemove, classesToAdd)
  {
    if (classesToRemove)
    {
      this.el.nativeElement.removeClass(classesToRemove);
    }
    if (classesToAdd)
    {
      this.el.nativeElement.addClass(classesToAdd);
    }
  }

  /*
  * @name EditorContainerController
  * @desc Represents a controller for editor container directive.
  */
  EditorContainerController() { // EditorContainerController.$inject = ['$animate', '$element'];
  }

  setReadonly(isReadonly) {
    this.el.nativeElement.element.toggleClass('is-readonly', isReadonly);
  }

  setDisabled(isDisabled) {
    this.el.nativeElement.element.toggleClass('is-disabled', isDisabled);
  }

  setFocused(isFocused) {
    this.el.nativeElement.element.toggleClass('is-focused', isFocused);
  }

  setInvalid(isInvalid) {
    if (isInvalid) {
      // $animate.addClass(this.el.nativeElement.element, 'is-invalid'); //ANIMATE
      this.el.nativeElement.addClass(this.el.nativeElement.element, 'is-invalid');
    }
    else {
      // $animate.removeClass(this.el.nativeElement.element, 'is-invalid'); //ANIMATE
      this.el.nativeElement.removeClass(this.el.nativeElement.element, 'is-invalid');
    }
  }

  setHasValue(isHasValue) {
    this.el.nativeElement.element.toggleClass('is-has-value', isHasValue);
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Layout directive

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  initLayoutObservers()
  {
  /*
    //var layoutValue = $element.attr('adm-editor-container-layout');
    const layoutValue = this.el.nativeElement.getAttribute('adm-editor-container-layout');

    //if (layoutValue && layoutValue.startsWith($interpolate.startSymbol()))
    if (layoutValue)
    {
      $attrs.$observe('admEditorContainerLayout', function ()
      {
        this.layoutChangeEvent.notify();
      });
    }

    var layoutSmValue = $element.attr('adm-editor-container-layout-sm');
    if (layoutSmValue && layoutSmValue.startsWith($interpolate.startSymbol()))
    {
      $attrs.$observe('admEditorContainerLayoutSm', function ()
      {
        this.layoutChangeEvent.notify();
      });
    }
  */
  }





  getLayoutClass(skipCaching)
  {
    if (this.layoutClass !== undefined && !skipCaching)
    {
      return this.layoutClass;
    }


    const layout = this.el.nativeElement.getAttribute('adm-editor-container-layout');
    const layoutSm = this.el.nativeElement.getAttribute('adm-editor-container-layout-sm');

    this.layoutClass = this.buildLayoutClass(layout, layoutSm);

    return this.layoutClass;
  }

  buildLayoutClass(layout, layoutSm)
  {
    if (!layout)
    {
      return undefined;
    }

    const CLASS_PREFIX = 'editor-container--';
    let className;

    if (layoutSm && layout !== layoutSm)
    {
      className = CLASS_PREFIX + layout + '-lg ';
      className += CLASS_PREFIX + layoutSm + '-sm';
    }
    else
    {
      className = CLASS_PREFIX + layout;
    }
    return className;
  }


}
