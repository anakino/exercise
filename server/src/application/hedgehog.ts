import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { Hedgehog, hedgehogSchema } from "@shared/hedgehog";
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


/**
 * Add new hedgehog to database
 *
 * @param Hedgehog Hedgehog coordinates
 * @returns Json hedgehog
 */
export async function addHedgehog(hedgehogData: Hedgehog) {
  try {
    const hedgehog = await getPool().any(
      sql.type(hedgehogSchema) `INSERT INTO hedgehog (name, age, gender)
      VALUES (${hedgehogData.name}, ${hedgehogData.age}, ${hedgehogData.gender})`
    );

    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}