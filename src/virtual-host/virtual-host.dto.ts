import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { DestinationType } from "src/prisma/generated";

registerEnumType(DestinationType, {
  name: 'DestinationType',
});

@InputType()
export class CreateVirtualHostDto {
  @Field()
  name!: string;
  @Field(() => DestinationType)
  type!: DestinationType

  // @Field()
  // namespace!: Namespace
}
