import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { DestinationType } from '@prisma/client';

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@InputType()
export class CreateVirtualHostInput {
  @Field()
  name!: string;
  @Field(() => DestinationType)
  type!: DestinationType;

  @Field()
  namespaceId!: string;
  @Field({ nullable: true })
  serverId?: string;
}
