import { getAllHedgehogs, getHedgehog, addHedgehog } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";

interface GetHedgehogById { 
  hedgehogId: number,
}

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request, reply) {
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  /**
   * Get single hedgehog by id
   */
  fastify.get("/:hedgehogId", async function (request : FastifyRequest<{Params: GetHedgehogById}>, reply) {
    const { hedgehogId } = request.params;

    const hedgehog = await getHedgehog(hedgehogId);

    return reply.code(200).send({
      hedgehog,
    });
  });

  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  // fastify.post(...)
  fastify.post("/add", async function (request, reply) {
    const requestBody = request.body;
    // TODO parse request body and send to addHedgehog
    // const response = await addHedgehog();

    return reply.code(200).send({
      response: true
    })
  })

  done();
}
