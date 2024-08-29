/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customers_uuid_key" ON "customers"("uuid");
