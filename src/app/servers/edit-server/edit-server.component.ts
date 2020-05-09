import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean;
  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
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
  }
}
