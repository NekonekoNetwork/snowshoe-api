import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateNamespaceInput {
  @Field()
  name!: string;
}

@InputType()
export class UpdateNamespaceInput extends PartialType(CreateNamespaceInput) {}
