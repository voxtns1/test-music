import "reflect-metadata"

import { DataSource } from "typeorm"
import { environment } from "../environments/environment"

const configure = {
  entities: ['apps/backend/src/db/entity/**/*.ts'],
  migrations: ['apps/backend/src/db/entity/**/*.ts'],
};

export const AppDataSource = new DataSource({
  type: "mysql",
  ...environment.database,
  ...configure
});
