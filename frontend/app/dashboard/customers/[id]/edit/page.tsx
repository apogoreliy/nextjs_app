import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import {fetchCustomerById} from '@/app/lib/data';
import {parseStringToInt} from "@/app/lib/utils";


export default async function Page({params}: { params: { id: string } }) {
    const id = params.id;
    const customer = await fetchCustomerById(parseStringToInt(id));

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Invoices', href: '/dashboard/customers'},
                    {
                        label: 'Edit Customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form customer={customer}/>
        </main>
    );
}