import { NamespaceModel } from '@app/common/namespace/model/namespace.model';
import { ServerModel } from '@app/common/server/model/server.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Fallback } from '@prisma/client';

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
