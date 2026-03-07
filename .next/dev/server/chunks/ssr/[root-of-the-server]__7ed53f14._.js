module.exports = [
"[project]/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7f2b4ecd34fceb5b65d33fccf1ce3d5a18d8bb5ab2":"prisma"},"",""] */ __turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "error",
        "warn"
    ]
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.prisma = prisma;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    prisma
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(prisma, "7f2b4ecd34fceb5b65d33fccf1ce3d5a18d8bb5ab2", null);
}),
"[project]/api/getGame/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4035571424c7135d9abd40e7327ff2fb4411535328":"getGameById","40f3a0ae1bd1db2d611237a2f2340ed9612317a899":"getDailyGameFromDb","40fbf2caef81a29d7ed4e965f3ce0b20fad9f2a51d":"getDailyGame"},"",""] */ __turbopack_context__.s([
    "getDailyGame",
    ()=>getDailyGame,
    "getDailyGameFromDb",
    ()=>getDailyGameFromDb,
    "getGameById",
    ()=>getGameById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
function toPuzzleKeyUTC(d) {
    return d.toISOString().slice(0, 10);
}
function dayIndexUTC(d) {
    const year = d.getUTCFullYear();
    const start = Date.UTC(year, 0, 1);
    const today = Date.UTC(year, d.getUTCMonth(), d.getUTCDate());
    return Math.floor((today - start) / (24 * 60 * 60 * 1000));
}
async function getDailyGame(_date = new Date()) {
    throw new Error("请使用异步版本 getDailyGameFromDb。");
}
async function getDailyGameFromDb(date = new Date()) {
    const all = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].game.findMany({
        include: {
            images: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    if (!all.length) {
        throw new Error("数据库中还没有 Game 记录，请先用 Prisma Studio 添加。");
    }
    const idx = dayIndexUTC(date) % all.length;
    const g = all[idx];
    let acceptable = [];
    try {
        acceptable = JSON.parse(g.acceptableAnswers || "[]") ?? [];
    } catch  {
        acceptable = [];
    }
    return {
        id: g.id,
        slug: g.slug,
        title: g.title,
        acceptableAnswers: acceptable,
        images: g.images.sort((a, b)=>a.order - b.order).map((img)=>img.url),
        puzzleKey: toPuzzleKeyUTC(date),
        maxGuesses: 6
    };
}
async function getGameById(id) {
    const g = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].game.findUnique({
        where: {
            id
        },
        include: {
            images: {
                orderBy: {
                    order: "asc"
                }
            }
        }
    });
    if (!g) return undefined;
    let acceptable = [];
    try {
        acceptable = JSON.parse(g.acceptableAnswers || "[]") ?? [];
    } catch  {
        acceptable = [];
    }
    return {
        id: g.id,
        slug: g.slug,
        title: g.title,
        acceptableAnswers: acceptable,
        images: g.images.sort((a, b)=>a.order - b.order).map((img)=>img.url)
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getDailyGame,
    getDailyGameFromDb,
    getGameById
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDailyGame, "40fbf2caef81a29d7ed4e965f3ce0b20fad9f2a51d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDailyGameFromDb, "40f3a0ae1bd1db2d611237a2f2340ed9612317a899", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getGameById, "4035571424c7135d9abd40e7327ff2fb4411535328", null);
}),
"[project]/.next-internal/server/app/game/page/actions.js { ACTIONS_MODULE0 => \"[project]/api/getGame/index.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/prisma.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/getGame/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/game/page/actions.js { ACTIONS_MODULE0 => \"[project]/api/getGame/index.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/prisma.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4035571424c7135d9abd40e7327ff2fb4411535328",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGameById"],
    "40f3a0ae1bd1db2d611237a2f2340ed9612317a899",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDailyGameFromDb"],
    "40fbf2caef81a29d7ed4e965f3ce0b20fad9f2a51d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDailyGame"],
    "7f2b4ecd34fceb5b65d33fccf1ce3d5a18d8bb5ab2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$game$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/game/page/actions.js { ACTIONS_MODULE0 => "[project]/api/getGame/index.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/prisma.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$api$2f$getGame$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/api/getGame/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-2c3a283f134fdcb6", () => require("@prisma/client-2c3a283f134fdcb6"));

module.exports = mod;
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7ed53f14._.js.map