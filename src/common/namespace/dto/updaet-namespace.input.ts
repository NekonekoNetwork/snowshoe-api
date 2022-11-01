import { CreateNamespaceInput } from '@app/common/namespace/dto/create-namespace.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNamespaceInput extends PartialType(CreateNamespaceInput) {}
