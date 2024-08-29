-- CreateIndex
CREATE INDEX "invoices_customer_id_amount_status_idx" ON "invoices"("customer_id", "amount", "status");
