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
    canActivate: [AuthGuard],
    component: ServersComponent,
    children: [
      { path: ":id/edit", component: EditServerComponent },
      { path: ":id", component: ServerComponent },
    ],
  },

  { path: "**", component: PageNotFoundComponent },
];
//decorate
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
