import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UsersService]
    })
  );

  it("should be created", () => {
    service = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
