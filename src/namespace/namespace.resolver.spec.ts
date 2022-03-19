import { Test, TestingModule } from '@nestjs/testing';
import { NamespaceResolver } from './namespace.resolver';

describe('NamespaceResolver', () => {
  let resolver: NamespaceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NamespaceResolver],
    }).compile();

    resolver = module.get<NamespaceResolver>(NamespaceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
