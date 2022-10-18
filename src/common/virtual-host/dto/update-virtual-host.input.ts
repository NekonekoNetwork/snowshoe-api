import { CreateVirtualHostInput } from '@app/common/virtual-host/dto/create-virtual-host.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVirtualHostInput extends PartialType(
  CreateVirtualHostInput,
) {}
