import {ComponentRef, Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatchTooltipComponent} from '../shared/match-tooltip/match-tooltip.component';
import {Match} from '../interfaces/match';

@Directive({
  selector: '[appMatchTooltip]'
})
export class MatchTooltipDirective implements OnInit {

  @Input('appMatchTooltip') match: Match;
  overlayRef: OverlayRef;

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private overlay: Overlay) {}

  ngOnInit() {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        // panelClass: 'item-tooltip-panel'
      }, {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        // panelClass: 'item-tooltip-panel'
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    const tooltipPortal = new ComponentPortal(MatchTooltipComponent);
    const tooltipRef: ComponentRef<MatchTooltipComponent> = this.overlayRef.attach(tooltipPortal);
    tooltipRef.instance.match = this.match;
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef.detach();
  }

}
