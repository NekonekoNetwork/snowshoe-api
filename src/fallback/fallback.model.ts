import { NamespaceModel } from '@app/namespace/namespace.model';
import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import type { Fallback } from '@prisma/client';

@ObjectType('Fallback')
export class FallbackModel extends BaseModel implements Fallback {
  @Field(() => String, { nullable: false })
  namespaceId!: string;
  @Field(() => NamespaceModel, { nullable: false })
  namespace?: NamespaceModel;

  @Field(() => String, { nullable: true })
  serverId!: string | null;
  @Field(() => ServerModel, { nullable: true })
  server?: ServerModel | null;
}
