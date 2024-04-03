import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@shared/hedgehog";
import { sql } from "slonik";

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id, name, age, gender FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

/**
 * Get one hedgehog from database by id
 *
 * @param id Hedgehog id
 * @returns Json hedgehog
 */
export async function getHedgehog(id: number) {
  try {
    const hedgehog = await getPool().any(
      sql.type(hedgehogSchema)`SELECT id, name, age, gender FROM hedgehog WHERE id = ${id}`
    );

    return hedgehog;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
