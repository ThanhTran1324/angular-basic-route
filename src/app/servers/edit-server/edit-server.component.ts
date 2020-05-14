import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { CanComponentDeactivate } from "src/app/can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.server = this.serversService.getServer(
    //   +this.route.snapshot.params["id"]
    // );
    // this.serverName = this.server.name;
    // this.serverStatus = this.server.status;

    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
    //snapshot
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    //subcribe
    this.route.queryParams.subscribe((queryparams: Params) => {
      this.allowEdit = queryparams["allowEdit"] === "1" ? true : false;
      // });
      // this.route.fragment.subscribe((frag) => {
      //   console.log(frag);
      // });
    });
  }
  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) return true;
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    )
      return confirm("Do you want to discard the changes?");
    else return true;
  }
}
