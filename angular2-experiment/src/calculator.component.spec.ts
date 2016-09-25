import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalculatorComponent } from './calculator.component';
import { NumberToWordPipe } from './number-to-word.pipe';

// A straightforward test - CalculatorComponent is constructed
// with all real dependencies, no mocks, no spies
describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let comp: CalculatorComponent;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // NumberToWordPipe is needed here, because CalculatorComponent doesn't refer to it explicitly
      // CalculatorService is not needed, because CalculatorComponent refers to it explicitly
      declarations: [ CalculatorComponent, NumberToWordPipe ]
    });

    fixture = TestBed.createComponent(CalculatorComponent);
    comp = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('div'));
  });

  it('should display value of 0 by default', () => {
    fixture.detectChanges();

    const headerElement = el.query(By.css('h1'));
    expect(headerElement.nativeElement.textContent).toEqual('hello world zero (ZERO)');
  });

  describe('when I put an explicit value', () => {
    it('should display this value', () => {
      const inputElement = el.query(By.css('input'));
      inputElement.nativeElement.value = '123';
      inputElement.triggerEventHandler('blur', null);
      
      fixture.detectChanges();

      const headerElement = el.query(By.css('h1'));
      expect(headerElement.nativeElement.textContent).toEqual('hello world 123 (123)');
    });
  });

  describe('when I click "increase"', () => {
    it('should display value of 1', () => {
      const increaseButtonElement = el.query(By.css('button.increase'));
      increaseButtonElement.triggerEventHandler('click', null);

      fixture.detectChanges();
      
      const headerElement = el.query(By.css('h1'));
      expect(headerElement.nativeElement.textContent).toEqual('hello world one (ONE)');
    });
  });

  describe('when I click "decrease"', () => {
    it('should display value of -1', () => {
      const decreaseButtonElement = el.query(By.css('button.decrease'));
      decreaseButtonElement.triggerEventHandler('click', null);

      fixture.detectChanges();
      
      const headerElement = el.query(By.css('h1'));
      expect(headerElement.nativeElement.textContent).toEqual('hello world -1 (-1)');
    });
  });
});
