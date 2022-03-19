import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { NamespaceModel } from "src/namespace/namespace.model";
import { PingPassthrough } from "src/prisma/generated";

registerEnumType(PingPassthrough, {
  name: 'PingPassthrough',
});

export type ServerWithNamespace = ServerModel & { namespace: NamespaceModel };

@ObjectType()
export class ServerModel {
  @Field(() => String)
  id!: string;
  @Field(() => NamespaceModel)
  namespace!: NamespaceModel;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  address!: string;
  @Field(() => Int)
  port!: number;

  @Field(() => String, { nullable: true })
  motd?: string | null;
  @Field(() => PingPassthrough)
  pingPassthrough!: PingPassthrough
}
