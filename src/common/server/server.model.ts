import { NamespaceModel } from '@app/common/namespace/namespace.model';
import { ServerStatusModel } from '@app/common/server-status/server-status.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PingPassthrough, Server } from '@prisma/client';

registerEnumType(PingPassthrough, {
  name: 'PingPassthrough',
});

@ObjectType('Server')
export class ServerModel extends BaseModel implements Server {
  @Field(() => String, { nullable: false })
  namespaceId!: string;
  @Field(() => NamespaceModel, { nullable: false })
  namespace?: NamespaceModel;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  address!: string;
  @Field(() => Int)
  port!: number;

  @Field(() => String, { nullable: true })
  motd!: string | null;
  @Field(() => PingPassthrough)
  pingPassthrough!: PingPassthrough;

  @Field(() => ServerStatusModel, { nullable: true })
  serverStatus?: ServerStatusModel | null;
}
