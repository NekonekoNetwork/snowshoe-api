import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateServerStatusSamplePlayerInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  id!: string;
}
