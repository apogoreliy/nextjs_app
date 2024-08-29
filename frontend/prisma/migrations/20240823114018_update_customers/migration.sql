/*
  Warnings:

  - Added the required column `uuid` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "uuid" TEXT NOT NULL;
