import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TabService} from '../tab.service';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabComponent implements OnInit {

    @Input() title: string = null;
    @Input() parent: string = null;
    private isActive = false;

    constructor(@Host() private tabService: TabService, private cdRef: ChangeDetectorRef) {
    }

    get active(): boolean {
        return this.isActive;
    }

    set active(value: boolean) {
        this.isActive = value;
        this.cdRef.detectChanges();
    }

    ngOnInit() {
        this.tabService.registerTab(this);
    }

}
