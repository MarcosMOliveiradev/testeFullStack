-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Usuarios" ("create_at", "email", "id", "name", "password", "update_at") SELECT "create_at", "email", "id", "name", "password", "update_at" FROM "Usuarios";
DROP TABLE "Usuarios";
ALTER TABLE "new_Usuarios" RENAME TO "Usuarios";
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
