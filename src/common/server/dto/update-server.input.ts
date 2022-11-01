import { CreateServerInput } from '@app/common/server/dto/create-server.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServerInput extends PartialType(
  OmitType(CreateServerInput, ['namespaceId'] as const),
) {}
