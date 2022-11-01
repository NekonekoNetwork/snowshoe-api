import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { PingPassthrough } from '@prisma/client';

registerEnumType(PingPassthrough, {
  name: 'PingPassthrough',
});

@InputType()
export class CreateServerInput {
  @Field(() => String)
  namespaceId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  address!: string;
  @Field(() => Int)
  port!: number;

  @Field(() => String, { nullable: true })
  motd?: string | null;

  @Field(() => PingPassthrough, { nullable: true })
  pingPassthrough?: PingPassthrough;
}
