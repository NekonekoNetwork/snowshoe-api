import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import type { VirtualHost } from '@prisma/client';

export enum DestinationType {
  NAMESPACE,
  SERVER,
}

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@ObjectType('VirtualHost')
export class VirtualHostModel extends BaseModel implements VirtualHost {
  @Field(() => String)
  name!: string;

  @Field(() => DestinationType, { nullable: false })
  type?: DestinationType;

  @Field(() => String, { nullable: false })
  namespaceId!: string;
  @Field(() => NamespaceModel, { nullable: false })
  namespace?: NamespaceModel;

  @Field(() => String, { nullable: true })
  serverId!: string | null;
  @Field(() => ServerModel, { nullable: true })
  server?: ServerModel | null;
}
