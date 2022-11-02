import { ServerModel } from '@app/common/server/model/server.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Namespace } from '@prisma/client';

@ObjectType('Namespace')
export class NamespaceModel extends BaseModel implements Namespace {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: false })
  destinationId?: string;
  @Field(() => [ServerModel], { nullable: false })
  servers?: ServerModel[];
}
