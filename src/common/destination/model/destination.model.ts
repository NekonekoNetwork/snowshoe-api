import { NamespaceModel } from '@app/common/namespace/namespace.model';
import { ServerModel } from '@app/common/server/server.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Destination, DestinationType } from '@prisma/client';

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@ObjectType('Destination')
export class DestinationModel extends BaseModel implements Destination {
  @Field(() => DestinationType, { nullable: false })
  type!: DestinationType;

  @Field(() => String, { nullable: false })
  namespaceId!: string;
  @Field(() => NamespaceModel, { nullable: false })
  namespace?: NamespaceModel;

  @Field(() => String, { nullable: true })
  serverId!: string | null;
  @Field(() => ServerModel, { nullable: true })
  server?: ServerModel | null;
}
