import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { ServerResolver } from "./servers/server/server-resolver.service";

//define app route
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users",
    component: UsersComponent,
    children: [{ path: ":id/:name", component: UserComponent }],
  },
  {
    path: "servers",
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: ":id",
        component: ServerComponent,
        resolve: { server: ServerResolver },
      },
    ],
  },

  {
    path: "**",
    component: PageNotFoundComponent,
    data: { message: "Page not found!" },
  },
];
//decorate
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
