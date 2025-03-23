
import { serveDir } from "jsr:@std/http/file-server";
import indexHandler from "../src/routes/index.mts";

export default {
    fetch: (req: Request) => {
        const url = new URL(req.url);

        if (url.pathname == "/") {
            return indexHandler(req, null!)
        }


        return serveDir(req, {
            fsRoot: "dist"
        });

    },
}