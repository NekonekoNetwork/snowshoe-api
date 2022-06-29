import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateVirtualHostInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  namespaceId!: string;
  @Field(() => String, { nullable: true })
  serverId?: string;
}

@InputType()
export class UpdateVirtualHostInput extends PartialType(
  CreateVirtualHostInput,
) {}
