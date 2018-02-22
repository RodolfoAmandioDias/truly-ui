import { CommonModule  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ContextMenuDemoComponent } from './context-menudemo.component';
import { ContextMenuDemoRoutingModule } from './context-menudemo-routing.module';
import { ContextMenuModule } from '../../../components/context-menu/index';
import { ButtonModule } from '../../../components/button/index';
import { HighlightJsModule } from 'ngx-highlight-js';
import { PanelGroupModule } from '../../../components/panelgroup';
import { ShowcaseCardModule } from '../../shared/components/showcase-card/showcase-card.module';
import { ShowcaseTablePropertiesModule } from '../../shared/components/showcase-table-properties/showcase-table-properties.module';
import { ShowcaseTableEventsModule } from '../../shared/components/showcase-table-events/showcase-table-events.module';

@NgModule({
  declarations: [
    ContextMenuDemoComponent
  ],
  imports: [
    CommonModule,
    PanelGroupModule,
    FormsModule,
    ContextMenuModule,
    ButtonModule,
    ContextMenuDemoRoutingModule,
    HighlightJsModule,
    ShowcaseCardModule,
    ShowcaseTablePropertiesModule,
    ShowcaseTableEventsModule
  ],
  exports: [
    ContextMenuDemoComponent
  ]
})
export class ContextMenuDemoModule {}
