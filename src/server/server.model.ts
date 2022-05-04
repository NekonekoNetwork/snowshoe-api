import { NamespaceModel } from '@app/namespace/namespace.model';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PingPassthrough } from '@prisma/client';

registerEnumType(PingPassthrough, {
  name: 'PingPassthrough',
});

@ObjectType('Server')
export class ServerModel {
  @Field(() => String)
  id!: string;
  @Field(() => NamespaceModel)
  namespace?: NamespaceModel;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  address!: string;
  @Field(() => Int)
  port!: number;

  @Field(() => String, { nullable: true })
  motd?: string | null;
  @Field(() => PingPassthrough)
  pingPassthrough!: PingPassthrough;
}
