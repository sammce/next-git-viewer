#!/usr/bin/env node

import fs from "node:fs";
import { program } from "commander";

program
  .command("copy-endpoints")
  .description("Copy the necessary NextJS endpoints to your project")
  .action(() => {
    console.log({ __dirname });
  });
