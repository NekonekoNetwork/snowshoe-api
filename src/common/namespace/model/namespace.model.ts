import { FallbackModel } from '@app/common/fallback/model/fallback.model';
import { ServerModel } from '@app/common/server/model/server.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Namespace } from '@prisma/client';

@ObjectType('Namespace')
export class NamespaceModel extends BaseModel implements Namespace {
  @Field(() => String)
  name!: string;

  @Field(() => [ServerModel], { nullable: false })
  servers?: ServerModel[];
  @Field(() => [FallbackModel], { nullable: false })
  fallbacks?: FallbackModel[];

  @Field(() => FallbackModel, { nullable: true })
  fallback?: FallbackModel | null;
}
