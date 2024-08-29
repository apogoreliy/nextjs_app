/*
  Warnings:

  - Changed the type of `customer_id` on the `invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenues" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "revenue" INTEGER NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
