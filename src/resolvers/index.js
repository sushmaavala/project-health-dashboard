import Resolver from "@forge/resolver";
import api, { route } from "@forge/api"; // ✅ import 'route'

const resolver = new Resolver();

resolver.define("getProjectStats", async (req) => {
  const projectKey = req.context?.extension?.project?.key;

  if (!projectKey) {
    throw new Error("Project key is undefined. Context not available.");
  }

  const response = await api
    .asApp()
    .requestJira(route`/rest/api/3/search?jql=project=${projectKey}&maxResults=50`); // ✅ wrap URL in `route``

  const data = await response.json();

  const total = data.issues.length;
  const completed = data.issues.filter(
    (issue) => issue.fields.status.name === "Done"
  ).length;
  const bugs = data.issues.filter(
    (issue) => issue.fields.issuetype.name === "Bug"
  ).length;
  const overdue = data.issues.filter((issue) => {
    const due = issue.fields.duedate;
    return due && new Date(due) < new Date();
  }).length;

  return {
    total,
    completed,
    bugs,
    overdue,
  };
});

export const handler = resolver.getDefinitions();
