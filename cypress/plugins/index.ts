import seedCognito from "../support/seed-cognito";

const plugins = (on, config) => {
   on("task", {
     seedCognito: async () => {
       await seedCognito()
       return null
     },
   });
  return config
};

export default plugins;
