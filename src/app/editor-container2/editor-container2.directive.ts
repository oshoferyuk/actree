import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appEditorContainer2]',
  // styleUrls: ['./editor-container.component.scss']
})
export class EditorContainer2Directive  implements OnInit, OnDestroy{

  title = 'test';

  UNDERLINED_INPUT_TYPES = [undefined, 'text', 'password'];
  labelElement;
  editorElement;
  ngMessagesElement;



  // Define default layout class.
  defaultLayoutClass = 'editor-container--column';
  cleanupItems = [];

  // @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    this.compileDirective();
    this.EditorContainerController();
    this.linkDirective();
  }

  /*
  * @name admEditorContainer
  * @desc Represents a container for property editor.
  */

  // This input types we marked as underlined input.

  compileDirective()
  {
    this.el.nativeElement.addClass('editor-container animatable');

    const elementChildrens = this.el.nativeElement.children();
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
        this.labelElement.addClass('editor-container__label');
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
          if (!this.editorElement.attr('id'))
          {
            // Generate and set new id for editor.
            this.editorElement.attr('id', 'editor_' + 33); // set random $mdUtil.nextUid()
          }
          // Set link between label and editor element.
          this.labelElement.attr('for', this.editorElement.attr('id'));
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
    editorElement.attr('adm-editor-container-adapter', '');

    // Mark input editor as underlined element.
    if (editorElement[0].tagName === 'INPUT')
    {
      const inputType = editorElement.attr('type');

      if (this.UNDERLINED_INPUT_TYPES.indexOf(inputType) !== -1)
      {
        editorElement.attr('adm-underlined-input', '');
      }
    }
  }

  wrapEditorAndMessages()
  {
    // var containerContentElement = angular.element('<div>');
    const containerContentElement = this.renderer.createElement('div');

    containerContentElement.addClass('editor-container__content');

    // Replace editor element to container.
    if (this.editorElement)
    {
      this.editorElement.detach();
      containerContentElement.append(this.editorElement);
    }
    // Replace ngMessages element to container
    if (this.ngMessagesElement)
    {
      this.ngMessagesElement.detach();
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


    if (editorContainerLayoutCtrl)
    {
      this.updateElementLayoutClass(editorContainerLayoutCtrl.getLayoutClass());

      // Listen layout class changing.
      this.cleanupItems.push(
        editorContainerLayoutCtrl.layoutChangeEvent.observe(function()
        {
          this.updateElementLayoutClass(editorContainerLayoutCtrl.getLayoutClass(true));
        }));
    }
    else
    {
      this.updateElementLayoutClass(undefined);
    }

    if (editorContainerClassCtrl != null)
    {
      this.updateElementClass(null, editorContainerClassCtrl.className);
      this.cleanupItems.push(
        editorContainerClassCtrl.classNameChangeEvent.observe((source, args) =>
        {
          this.updateElementClass(args.oldClassName, args.newClassName);
        }));
    }

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
    this.el.nativeElement.removeClass(LAYOUT_CLASSES.join(' '));

    // Apply layout class.
    this.el.nativeElement.addClass(layoutClass || this.defaultLayoutClass);
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

}
