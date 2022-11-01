import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNamespaceInput {
  @Field(() => String)
  name!: string;
}
