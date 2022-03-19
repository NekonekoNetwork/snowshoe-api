import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NamespaceModule } from './namespace/namespace.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServerModule } from './server/server.module';
import { VirtualHostModule } from './virtual-host/virtual-host.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    NamespaceModule,
    ServerModule,
    VirtualHostModule,
  ],
})
export class AppModule { }
