import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {TabService} from '../tab.service';
import {TabComponent} from '../tab/tab.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css'],
    providers: [
        TabService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements OnDestroy, OnInit {

    public tabTitles: string[] = [];
    public activeTab = 0;
    private subscriptions: Subscription[] = [];

    constructor(private tabService: TabService, private cdRef: ChangeDetectorRef) {
    }

    ngOnDestroy(): void {
        while (this.subscriptions.length > 0) {
            this.subscriptions.pop().unsubscribe();
        }
    }

    public selectTab(event: Event, index: number) {
        this.activeTab = index;
        this.tabService.selectTab(index);
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.tabService.tabs.subscribe((tabs: TabComponent[]) => {
                this.tabTitles = tabs.map((tab: TabComponent) => tab.title);
                this.cdRef.detectChanges();
            }),
        );
    }
}
