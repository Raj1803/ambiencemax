import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewStatusRequestsPage } from './view-status-requests.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ViewStatusRequestsPage,
    children: [
      {
        path: 'view-request',
        children: [
          {
            path:'',
            loadChildren: () => import('../view-request/view-request.module').then( m => m.ViewRequestPageModule)
          }
        ]
      },
      {
        path: 'view-logs',
        children: [
          {
            path:'',
            loadChildren: () => import('../view-logs/view-logs.module').then( m => m.ViewLogsPageModule)
          }
        ]
      },
      {
        path: 'view-status',
        children: [
          {
            path:'',
            loadChildren: () => import('../view-status/view-status.module').then(m => m.ViewStatusPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/view-request',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/view-request',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewStatusRequestsPageRoutingModule {}
