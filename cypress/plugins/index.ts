import seedCognito from "../support/seed-cognito";
import { rmdir } from "fs";

const plugins = (on, config) => {
  on("task", {
    deleteFolder(folderName: string) {
      console.log("deleting folder %s", folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, err => {
          if (err) {
            console.error(err);

            return reject(err);
          }

          resolve(null);
        });
      });
    },
    seedCognito: async () => {
      await seedCognito();
      return null;
    }
  });
  return config;
};

export default plugins;
