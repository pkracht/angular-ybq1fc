import {Injectable} from '@angular/core';
import {TabComponent} from './tab/tab.component';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TabService {

    private activeTab = 0;
    private tabItems: TabComponent[] = [];
    private tabsSubject: Subject<TabComponent[]> = new Subject<TabComponent[]>();

    constructor() {
    }

    public get tabs(): Observable<TabComponent[]> {
        return this.tabsSubject;
    }

    public registerTab(tab: TabComponent) {
        tab.active = this.tabItems.length === 0;
        this.tabItems.push(tab);
        this.tabsSubject.next(this.tabItems);
    }

    public selectTab(index: number) {
        this.tabItems[this.activeTab].active = false;
        this.tabItems[index].active = true;
        this.activeTab = index;
    }
}
