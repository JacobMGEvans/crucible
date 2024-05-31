import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path/posix";
import OpenAPIParser from "@readme/openapi-parser";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "public", "swagger.json");
  const file = readFileSync(filePath, "utf8");
  const data = await OpenAPIParser.dereference(file, {
    dereference: {
      circular: false,
    },
  });

  return Response.json(data);
}
