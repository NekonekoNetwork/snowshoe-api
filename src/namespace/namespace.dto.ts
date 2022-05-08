import { FallbackInput } from '@app/fallback/fallback.dto';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateNamespaceInput {
  @Field(() => String)
  name!: string;
}

@InputType()
export class UpdateNamespaceInput extends PartialType(CreateNamespaceInput) {
  @Field(() => FallbackInput, { nullable: true })
  fallback?: FallbackInput;
}
