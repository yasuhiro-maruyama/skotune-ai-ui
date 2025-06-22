"use server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/swagger/swagger.yaml");
  const fileContents = await fs.readFile(filePath, "utf8");

  return new Response(fileContents, {
    headers: {
      "Content-Type": "application/yaml",
    },
  });
}
