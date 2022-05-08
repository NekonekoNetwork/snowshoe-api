import {
  Field,
  InputType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { DestinationType } from '@prisma/client';

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@InputType()
export class CreateVirtualHostInput {
  @Field(() => String)
  name!: string;
  @Field(() => DestinationType)
  type!: DestinationType;

  @Field(() => String)
  namespaceId!: string;
  @Field(() => String, { nullable: true })
  serverId?: string;
}

@InputType()
export class UpdateVirtualHostInput extends PartialType(
  CreateVirtualHostInput,
) {}
