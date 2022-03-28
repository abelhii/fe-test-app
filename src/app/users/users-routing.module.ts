import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddNewUserComponent } from "./add-new-user/add-new-user.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: 'full' },
  { path: "users", component: UsersComponent },
  { path: "users/create", component: AddNewUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
