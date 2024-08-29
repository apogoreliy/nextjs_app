/*
  Warnings:

  - A unique constraint covering the columns `[customer_id,amount,status]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "invoices_customer_id_amount_status_idx";

-- CreateIndex
CREATE UNIQUE INDEX "invoices_customer_id_amount_status_key" ON "invoices"("customer_id", "amount", "status");
