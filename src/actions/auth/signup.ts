"use server";

import { ActionResult } from "next/dist/server/app-render/types";
import { ifUserExistInDatabase } from "./user";
import { validSchemaAuth } from "@/zod/auth/schema-auth";
import { stat } from "fs";

export async function signup(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const parseData = validSchemaAuth.parse({ username, password });
    console.log(parseData);
    const existingUser = await ifUserExistInDatabase(parseData.username);

    if (!existingUser) {
      return {
        status: "error",
        message: "Incorrect username or password",
      };
    }

    //TODO : continuer sur validation du pw avec sign in tutoriel
    return { status: "success", message: "reussi youpi" };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "An error has occurred" };
  }
}
