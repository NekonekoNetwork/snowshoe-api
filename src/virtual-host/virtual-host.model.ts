import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { DestinationType } from '@prisma/client';

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@ObjectType()
export class VirtualHostModel {
  @Field(() => String)
  id!: string;
  @Field(() => String)
  name!: string;

  @Field(() => DestinationType)
  type!: DestinationType;

  @Field(() => NamespaceModel)
  namespace?: NamespaceModel;
  @Field(() => ServerModel, { nullable: true })
  server?: ServerModel;
}
