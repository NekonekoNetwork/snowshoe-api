import { DestinationModel } from '@app/common/destination/model/destination.model';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class DestinationInput extends OmitType(DestinationModel, [
  'id',
  'namespace',
  'server',
  'createdAt',
  'updatedAt',
] as const) {}
