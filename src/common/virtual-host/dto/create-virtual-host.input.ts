import { DestinationInput } from '@app/common/destination/dto/destination.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVirtualHostInput {
  @Field(() => String)
  name!: string;

  @Field(() => [DestinationInput])
  destinations!: DestinationInput[];
}
