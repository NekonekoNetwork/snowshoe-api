import { Query, Resolver } from '@nestjs/graphql';
import { NamespaceModel } from './namespace.model';
import { NamespaceService } from './namespace.service';

@Resolver()
export class NamespaceResolver {
  constructor(private readonly namespaceService: NamespaceService) { }

  @Query(() => [NamespaceModel])
  async namespaces(): Promise<NamespaceModel[]> {
    return this.namespaceService.findNamespaces();
  }
}
