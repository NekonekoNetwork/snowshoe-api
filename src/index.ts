import * as grpc from "@grpc/grpc-js";
import { PrismaClient } from "./generated/prisma";
import { HelloWorldService } from "./generated/proto/hello_grpc_pb";
import { HelloServer } from "./services/hello.service";

const prisma = new PrismaClient();

async function main() {
    console.log("Hello World!");

    const server = new grpc.Server();

    server.addService(HelloWorldService, new HelloServer());

    server.bindAsync('0.0.0.0:9898', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
        } else {
            server.start();
            console.log(`Server started on port ${port}`);
        }
    });
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    });