import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FallbackInput {
  @Field(() => String, { nullable: false })
  namespaceId?: string;
  @Field(() => String, { nullable: true })
  serverId?: string;
}
