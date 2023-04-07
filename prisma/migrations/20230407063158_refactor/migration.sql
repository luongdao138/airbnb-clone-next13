/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "hashed_password";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashed_password" VARCHAR(100);
