import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs/tabs.component';
import {TabComponent} from './tab/tab.component';
import {createCustomElement} from '@angular/elements';

@NgModule({
    declarations: [TabsComponent, TabComponent],
    imports: [
        CommonModule,
    ],
    exports: [TabsComponent, TabComponent],
    entryComponents: [TabsComponent, TabComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsModule {
    constructor(private injector: Injector) {
        const elements: any[] = [
            [TabsComponent, 'rsu-tabs'],
            [TabComponent, 'rsu-tab'],
        ];

        for (const [component, name] of elements) {
            const el = createCustomElement(component, {injector: this.injector});
            customElements.define(name, el);
        }
    }
}
