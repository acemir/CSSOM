const { default: getReleasePlan } = require("@changesets/get-release-plan");

async function main() {
  const cwd = process.cwd();
  const plan = await getReleasePlan(cwd);

  if (!plan.releases.length) {
    console.error("No releases planned");
    process.exit(1);
  }

  console.log(plan.releases[0].newVersion);
}

main();
