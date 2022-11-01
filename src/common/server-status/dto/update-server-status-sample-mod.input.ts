import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateServerStatusSampleModInput {
  @Field(() => String, { nullable: false })
  name!: string;
  @Field(() => String, { nullable: false })
  version!: string;
}
