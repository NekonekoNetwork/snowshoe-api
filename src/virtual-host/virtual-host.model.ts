import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { NamespaceModel } from "src/namespace/namespace.model";
import { DestinationType } from "src/prisma/generated";
import { ServerModel } from "src/server/server.model";

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

export type VirtualHostWithNamespaceAndServer = VirtualHostModel & { namespace: NamespaceModel }

@ObjectType()
export class VirtualHostModel {
  @Field(() => String)
  id!: string;
  @Field(() => String)
  name!: string;

  @Field(() => DestinationType)
  type!: DestinationType

  @Field(() => NamespaceModel)
  namespace!: NamespaceModel
  @Field(() => ServerModel)
  server?: ServerModel | null;
}
