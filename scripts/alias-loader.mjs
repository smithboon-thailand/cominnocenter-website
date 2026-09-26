/** ลงทะเบียน alias-hooks.mjs — ใช้ผ่าน `node --import ./scripts/alias-loader.mjs` */
import { register } from "node:module";

register("./alias-hooks.mjs", import.meta.url);
