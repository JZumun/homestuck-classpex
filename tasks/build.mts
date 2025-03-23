import pug from "pug";
import fs from "node:fs";

const DEST_DIRECTORY = "dist";
function ensureDestinationDirectoryExists() {
  fs.rmSync(DEST_DIRECTORY, { recursive: true, force: true });
  fs.mkdirSync(DEST_DIRECTORY, { recursive: true });
}

function generateHtmlFiles() {
  const SRC_VIEWS_DIRECTORY = "src/views";
  const files = {
    "form.html": "form.pug",
    "simple.html": "simple.pug",
    "404.html": "error.pug",
  };

  for (const [target, source] of Object.entries(files)) {
    const template = pug.compileFile(`${Deno.cwd()}/${SRC_VIEWS_DIRECTORY}/${source}`, {
      pretty: true,
    });
    const content = template();
    fs.writeFileSync(`${DEST_DIRECTORY}/${target}`, content);
  }
}

function bundleStaticFiles() {
  const SRC_STATIC_DIRECTORY = "src/public";

  fs.cpSync(`${Deno.cwd()}/${SRC_STATIC_DIRECTORY}`, DEST_DIRECTORY, { recursive: true });
}

if (import.meta.main === true) {
  ensureDestinationDirectoryExists();
  generateHtmlFiles();
  bundleStaticFiles();
}
