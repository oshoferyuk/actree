import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressIndicatorComponent } from './progress-indicator.component';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProgressIndicatorComponent', () => {
  let component: ProgressIndicatorComponent;
  let fixture: ComponentFixture<ProgressIndicatorComponent>;


  const mockElementRef: any = {
    nativeElement: {
      parentElement: {
        parentElement: {
          get clientWidth() {
            return 400;
          }
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ ProgressIndicatorComponent ],
      providers: [
        { provide: ElementRef, useValue: mockElementRef }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('states sub group', () => {

    it('should set state1 with value and params for animation of 1st dot', () => {
      expect(component.state1).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();
      expect(component.state1.params).toBeDefined();
      expect(component.state1.params.translateX0).toEqual(jasmine.any(Number));
      expect(component.state1.params.translateX1).toEqual(jasmine.any(Number));
      expect(component.state1.params.translateX2).toEqual(jasmine.any(Number));
      expect(component.state1.params.translateX3).toEqual(jasmine.any(Number));
      expect(component.state1.params.translateX4).toEqual(jasmine.any(Number));
      expect(component.state1.params.timing).toEqual(jasmine.any(String));

      expect(component.state1.value).toBeDefined();
      expect(component.state1.value).toEqual(jasmine.any(String));
    });

    it('should set state2 with value and params for animation of 2nd dot', () => {
      expect(component.state2).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();
      expect(component.state2.params).toBeDefined();
      expect(component.state2.params.translateX0).toEqual(jasmine.any(Number));
      expect(component.state2.params.translateX1).toEqual(jasmine.any(Number));
      expect(component.state2.params.translateX2).toEqual(jasmine.any(Number));
      expect(component.state2.params.translateX3).toEqual(jasmine.any(Number));
      expect(component.state2.params.translateX4).toEqual(jasmine.any(Number));
      expect(component.state2.params.timing).toEqual(jasmine.any(String));

      expect(component.state2.value).toBeDefined();
      expect(component.state2.value).toEqual(jasmine.any(String));
    });

    it('should set state3 with value and params for animation of 3rd dot', () => {
      expect(component.state3).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();
      expect(component.state3.params).toBeDefined();
      expect(component.state3.params.translateX0).toEqual(jasmine.any(Number));
      expect(component.state3.params.translateX1).toEqual(jasmine.any(Number));
      expect(component.state3.params.translateX2).toEqual(jasmine.any(Number));
      expect(component.state3.params.translateX3).toEqual(jasmine.any(Number));
      expect(component.state3.params.translateX4).toEqual(jasmine.any(Number));
      expect(component.state3.params.timing).toEqual(jasmine.any(String));

      expect(component.state3.value).toBeDefined();
      expect(component.state3.value).toEqual(jasmine.any(String));
    });

    it('should set state4 with value and params for animation of 4th dot', () => {
      expect(component.state4).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();
      expect(component.state4.params).toBeDefined();
      expect(component.state4.params.translateX0).toEqual(jasmine.any(Number));
      expect(component.state4.params.translateX1).toEqual(jasmine.any(Number));
      expect(component.state4.params.translateX2).toEqual(jasmine.any(Number));
      expect(component.state4.params.translateX3).toEqual(jasmine.any(Number));
      expect(component.state4.params.translateX4).toEqual(jasmine.any(Number));
      expect(component.state4.params.timing).toEqual(jasmine.any(String));

      expect(component.state4.value).toBeDefined();
      expect(component.state4.value).toEqual(jasmine.any(String));
    });

    it('should set state5 with value and params for animation of 5th dot', () => {
      expect(component.state5).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();
      expect(component.state5.params).toBeDefined();
      expect(component.state5.params.translateX0).toEqual(jasmine.any(Number));
      expect(component.state5.params.translateX1).toEqual(jasmine.any(Number));
      expect(component.state5.params.translateX2).toEqual(jasmine.any(Number));
      expect(component.state5.params.translateX3).toEqual(jasmine.any(Number));
      expect(component.state5.params.translateX4).toEqual(jasmine.any(Number));
      expect(component.state5.params.timing).toEqual(jasmine.any(String));

      expect(component.state5.value).toBeDefined();
      expect(component.state5.value).toEqual(jasmine.any(String));
    });

  });

  describe('onDone sub group', () => {

    it('should change state1 value from start to stop and vise-versa', () => {
      expect(component.state1).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();

      component.onDone(null);
      expect(component.state1.value).toEqual('stop');

      component.onDone(null);
      expect(component.state1.value).toEqual('start');
    });

    it('should change state2 value from start to stop and vise-versa', () => {
      expect(component.state2).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();

      component.onDone(null);
      expect(component.state2.value).toEqual('stop');

      component.onDone(null);
      expect(component.state2.value).toEqual('start');
    });

    it('should change state1 value from start to stop and vise-versa', () => {
      expect(component.state3).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();

      component.onDone(null);
      expect(component.state3.value).toEqual('stop');

      component.onDone(null);
      expect(component.state3.value).toEqual('start');
    });

    it('should change state1 value from start to stop and vise-versa', () => {
      expect(component.state4).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();

      component.onDone(null);
      expect(component.state4.value).toEqual('stop');

      component.onDone(null);
      expect(component.state4.value).toEqual('start');
    });

    it('should change state1 value from start to stop and vise-versa', () => {
      expect(component.state5).toBeDefined();
      component.currentWidth = 100;
      component.ngOnInit();

      component.onDone(null);
      expect(component.state5.value).toEqual('stop');

      component.onDone(null);
      expect(component.state5.value).toEqual('start');
    });
  });

  it('should set currentWidth to width if width is presented', () => {
    component.width = 100;
    component.ngAfterViewInit();
    expect(component.currentWidth).toEqual(100);
  });

  it('should set currentWidth to parent width if width is not presented', () => {
    component.width = undefined;
    component.self = mockElementRef;
    component.ngAfterViewInit();
    expect(component.currentWidth).toEqual(mockElementRef.nativeElement.parentElement.parentElement.clientWidth);
  });
});
