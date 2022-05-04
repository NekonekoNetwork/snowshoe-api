import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Namespace')
export class NamespaceModel extends BaseModel {
  @Field(() => String)
  name!: string;

  @Field(() => [ServerModel])
  servers?: ServerModel[];

  @Field(() => [VirtualHostModel])
  virtualHosts?: VirtualHostModel[];
}
