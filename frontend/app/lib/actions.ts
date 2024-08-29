'use server';

import {z} from 'zod';
import {
    createNewCustomer,
    createNewInvoice,
    deleteExistCustomer,
    deleteExistInvoice,
    updateExistCustomer,
    updateExistInvoice,
} from '@/app/lib/data';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {parseStringToInt} from '@/app/lib/utils';
import {signIn} from '@/auth';
import {AuthError} from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.coerce.number(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const InvoiceSchema = FormSchema.omit({id: true, date: true});

export async function createInvoice(formData: FormData) {
    const {customerId, amount, status} = InvoiceSchema.parse(Object.fromEntries(formData.entries()));
    const amountInCents = amount * 100;
    const date = new Date();
    await createNewInvoice(customerId, amountInCents, status, date);
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function updateInvoice(invoice_id: string, formData: FormData) {
    const {customerId, amount, status} = InvoiceSchema.parse(Object.fromEntries(formData.entries()));
    const data = {
        customer_id: customerId,
        amount: amount,
        status: status
    }
    await updateExistInvoice(parseStringToInt(invoice_id), data);
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(invoice_id: number) {
    await deleteExistInvoice(parseStringToInt(invoice_id));
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


const CustomersFormSchema = z.object({
    id: z.string(),
    name: z.coerce.string(),
    email: z.coerce.string(),
    uuid: z.coerce.string(),
    image_url: z.coerce.string(),
});

const CustomerSchema = CustomersFormSchema.omit({id: true});

export async function createCustomer(formData: FormData) {
    const {name, email, uuid, image_url} = CustomerSchema.parse(Object.fromEntries(formData.entries()));
    await createNewCustomer(name, email, image_url, uuid);
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function updateCustomer(customer_id: string, formData: FormData): Promise<void> {
    const {name, email, uuid, image_url} = CustomerSchema.parse(Object.fromEntries(formData.entries()));
    const data = {
        name: name,
        email: email,
        uuid: uuid,
        image_url: image_url,
    }
    await updateExistCustomer(parseStringToInt(customer_id), data);
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function deleteCustomer(customer_id: number) {
    await deleteExistCustomer(parseStringToInt(customer_id));
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}