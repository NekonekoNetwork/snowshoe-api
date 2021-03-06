import { FallbackModel } from '@app/fallback/fallback.model';
import { ServerModel } from '@app/server/server.model';
import { BaseModel } from '@app/shared/base.model';
import { VirtualHostModel } from '@app/virtual-host/virtual-host.model';
import { Field, ObjectType } from '@nestjs/graphql';
import type { Namespace } from '@prisma/client';

@ObjectType('Namespace')
export class NamespaceModel extends BaseModel implements Namespace {
  @Field(() => String)
  name!: string;

  @Field(() => [ServerModel], { nullable: false })
  servers?: ServerModel[];
  @Field(() => [FallbackModel], { nullable: false })
  fallbacks?: FallbackModel[];
  @Field(() => [VirtualHostModel], { nullable: false })
  virtualHosts?: VirtualHostModel[];

  @Field(() => FallbackModel, { nullable: true })
  fallback?: FallbackModel | null;
}
