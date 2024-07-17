import fs from "fs";
import path from "path/posix";
import { fromOpenApi } from "@mswjs/source/open-api";

export default async function Home() {
  const handlers = await fromOpenApi("public/swagger.json");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono">
        {JSON.stringify(handlers, null, 2)}
      </div>
    </main>
  );
}
