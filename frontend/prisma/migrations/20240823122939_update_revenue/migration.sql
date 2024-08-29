/*
  Warnings:

  - A unique constraint covering the columns `[month,revenue]` on the table `revenues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "revenues_month_revenue_key" ON "revenues"("month", "revenue");
