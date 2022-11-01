import { DestinationModel } from '@app/common/destination/model/destination.model';
import { BaseModel } from '@app/common/shared/base.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { VirtualHost } from '@prisma/client';

@ObjectType('VirtualHost')
export class VirtualHostModel extends BaseModel implements VirtualHost {
  @Field(() => String)
  name!: string;

  @Field(() => [DestinationModel], { nullable: false })
  destinations?: DestinationModel[];
}
