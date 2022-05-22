import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: '[dav-title]',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '[class.dav-primary]' : 'color==="primary"',
    '[class.dav-secondary]' : 'color==="secondary"',
    }
})
export class TitleComponent implements OnInit {
  @Input() public color: 'primary' | 'secondary' ='primary'
  constructor() { }

  ngOnInit(): void {
  }

}
