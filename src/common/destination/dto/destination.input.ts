import { Field, InputType } from '@nestjs/graphql';
import { DestinationType } from '@prisma/client';
import { IsNotEmpty, ValidateIf } from 'class-validator';

@InputType()
export class DestinationInput {
  @Field(() => DestinationType, { nullable: false })
  type!: DestinationType;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  namespaceId!: string;

  @ValidateIf((o) => o.type === DestinationType.SERVER)
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  serverId!: string | null;
}
