import OpenAPIParser from "@readme/openapi-parser";
import fs from "fs";
import { OpenAPIV3 } from "openapi-types";
import path from "path/posix";

interface Endpoint {
  path: string;
  method: string;
  requestBody?: any;
  responses: OpenAPIV3.ResponsesObject;
}

function isRequestBodyObject(obj: any): obj is OpenAPIV3.RequestBodyObject {
  return obj && obj.content !== undefined;
}

export default async function Home() {
  const data: OpenAPIV3.Document = (await OpenAPIParser.dereference(
    "public/swagger.json"
  )) as OpenAPIV3.Document;
  const parsedEndpoints: Endpoint[] = [];

  for (const path in data.paths) {
    const pathItem = data.paths[path] as OpenAPIV3.PathItemObject;

    for (const method in pathItem) {
      if (["get", "post", "put", "patch"].includes(method)) {
        const endpoint = pathItem[
          method as keyof OpenAPIV3.PathItemObject
        ] as OpenAPIV3.OperationObject;

        let requestBody;
        if (endpoint.requestBody && isRequestBodyObject(endpoint.requestBody)) {
          requestBody = endpoint.requestBody.content;
        }

        parsedEndpoints.push({
          path,
          method,
          requestBody,
          responses: extractRelevantResponses(endpoint.responses),
        });
      }
    }
  }

  await generateHandlersFile(parsedEndpoints);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
        {parsedEndpoints.map((endpoint, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold">
              {endpoint.method.toUpperCase()} {endpoint.path}
            </h3>
            {endpoint.requestBody && (
              <div>
                <h4 className="font-semibold">Request Body:</h4>
                <pre>{JSON.stringify(endpoint.requestBody, null, 2)}</pre>
              </div>
            )}
            <div>
              <h4 className="font-semibold">Responses:</h4>
              <pre>{JSON.stringify(endpoint.responses, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function generateHandlerString(endpoint: Endpoint): string {
  return `
  http.${endpoint.method}('${endpoint.path}', async ({ request }) => {
    const mockResponse = {
      message: \`Mocked ${endpoint.method.toUpperCase()} response for ${
    endpoint.path
  }\`,
      requestBody: ${endpoint.requestBody ? "await request.json()" : "null"},
      responses: ${JSON.stringify(endpoint.responses, null, 2)},
    };
    return new Response(JSON.stringify(mockResponse), {
      headers: { 'Content-Type': 'application/json' },
    });
  })`;
}

async function generateHandlersFile(endpoints: Endpoint[]) {
  const handlersString = endpoints.map(generateHandlerString).join(",\n");
  const fileContent = `
  import { http } from 'msw';

  export const handlers = [
    ${handlersString}
  ];
  `;

  const filePath = path.join(process.cwd(), "src/mocks/handlers.ts");
  fs.writeFileSync(filePath, fileContent);
}

function extractRelevantResponses(responses: OpenAPIV3.ResponsesObject): {
  [status: string]: any;
} {
  const relevantResponses: { [status: string]: any } = {};

  if (responses["200"]) {
    relevantResponses["200"] = responses["200"];
  }

  if (responses["400"]) {
    relevantResponses["400"] = responses["400"];
  }

  return relevantResponses;
}
