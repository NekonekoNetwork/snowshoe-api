import { Query, Resolver } from '@nestjs/graphql';
import { ServerModel } from './server.model';
import { ServerService } from './server.service';

@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) { }

  @Query(() => [ServerModel])
  async servers(): Promise<ServerModel[]> {
    return this.serverService.findServers();
  }
}
