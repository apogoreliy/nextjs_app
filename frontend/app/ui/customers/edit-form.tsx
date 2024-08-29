'use client';

import Link from 'next/link';
import {Button} from '@/app/ui/button';
import {updateCustomer} from '@/app/lib/actions';
import {Customer} from "@/app/lib/definitions";

export default function Form({customer}: {
    customer: Customer | null;
}) {
    if(!customer){
        return
    }

    const updateCustomerWithId = updateCustomer.bind(null, customer.id);
    return (
        <form action={updateCustomerWithId}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Customer name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Choose an name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                defaultValue={customer.name}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Customer email */}
                <div className="mb-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Choose an email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter email"
                                defaultValue={customer.email}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Customer uuid */}
                <div className="mb-4">
                    <label htmlFor="uuid" className="mb-2 block text-sm font-medium">
                        Choose an uuid
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="uuid"
                                name="uuid"
                                type="text"
                                placeholder="Enter uuid"
                                defaultValue={customer.uuid}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Customer image url */}
                <div className="mb-4">
                    <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
                        Choose an image url
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="image_url"
                                name="image_url"
                                type="text"
                                placeholder="Enter image url"
                                defaultValue={customer.image_url}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Edit Customer</Button>
            </div>
        </form>
    );
}
