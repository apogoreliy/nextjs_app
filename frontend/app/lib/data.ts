import {formatCurrency} from './utils';
import {customers, invoices, revenue, users} from '../lib/placeholder-data';
import prisma from 'app/lib/prisma';
import {Customer} from 'app/lib/definitions'

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue() {
    try {
        console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log('Data fetch completed after 3 seconds.');
        return await prisma.revenues.findMany();
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchCardData() {
    try {
        const [numberOfCustomers, numberOfInvoices, paidSum, pendingSum] = await Promise.all([
            await prisma.customers.count(),
            await prisma.invoices.count(),
            await prisma.invoices.aggregate({
                _sum: {
                    amount: true,
                },
                where: {
                    status: 'paid',
                },
            }),
            await prisma.invoices.aggregate({
                _sum: {
                    amount: true,
                },
                where: {
                    status: 'pending',
                },
            })
        ]);

        const totalPaidInvoices = formatCurrency(paidSum._sum.amount ?? 0);
        const totalPendingInvoices = formatCurrency(pendingSum._sum.amount ?? 0);
        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
    }
}

// Invoices
export async function fetchLatestInvoices() {
    try {
        console.log('Fetching latest invoices data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await prisma.invoices.findMany({
            orderBy: {
                date: 'desc',
            },
            take: 5,
            include: {
                customer: true,
            },
        });

        return data.map(invoice => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

export async function fetchFilteredInvoices(query: string, currentPage: number) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        return await prisma.invoices.findMany({
            orderBy: {
                date: 'desc',
            },
            skip: offset,
            take: ITEMS_PER_PAGE,
            include: {
                customer: true,
            },
            where: {
                OR: [
                    {
                        customer: {
                            name: {
                                contains: `%${query}%`
                            }
                        },
                    },
                    {
                        customer: {
                            email: {
                                contains: `%${query}%`
                            }
                        },
                    },
                    {
                        status: {
                            contains: `%${query}%`
                        },
                    },
                ]

            }
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await prisma.invoices.count({
            where: {
                OR: [
                    {
                        customer: {
                            name: {
                                contains: `%${query}%`
                            }
                        },
                    },
                    {
                        customer: {
                            email: {
                                contains: `%${query}%`
                            }
                        },
                    },
                    {
                        status: {
                            contains: `%${query}%`
                        },
                    },
                ]
            },
        });
        return Math.ceil(Number(count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function createNewInvoice(customerId: number, amount: number, status: string, date: Date) {
    try {
        await prisma.invoices.upsert({
            where: {
                customer_id_amount_status: {
                    customer_id: customerId,
                    status: status,
                    amount: amount,
                },
            },
            update: {
                date: new Date()
            },
            create: {
                customer_id: customerId,
                status: status,
                amount: amount,
                date: date,
            }
        })
    } catch (error) {
        console.log("error during creating invoice", error);
        throw new Error('Failed to create invoice.');
    }
}

export async function fetchInvoiceById(id: number) {
    try {
        return await prisma.invoices.findUnique({
            where: {id: id}
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}

export async function updateExistInvoice(
    invoice_id: number,
    data: {
        customer_id: number;
        amount: number;
        status: string
    }
) {
    try {
        await prisma.invoices.update({
            where: {
                id: invoice_id
            },
            data: data
        })
    } catch (error) {
        console.log("error during updating invoice", error);
        throw new Error('Failed to update invoice.');
    }
}

export async function deleteExistInvoice(invoice_id: number) {
    try {
        await prisma.invoices.delete({
            where: {
                id: invoice_id
            },
        })
    } catch (error) {
        console.log("error during deleting invoice", error);
        throw new Error('Failed to delete invoice.');
    }
}

// Customers
export async function fetchCustomers() {
    try {
        return await prisma.customers.findMany({
            orderBy: {
                name: 'asc'
            }
        });
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchCustomersPages(query: string) {
    try {
        const count = await prisma.customers.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: `%${query}%`
                        }
                    },
                    {
                        email: {
                            contains: `%${query}%`
                        }
                    },
                ]
            },
        });
        return Math.ceil(Number(count) / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of customers.');
    }
}

export async function fetchFilteredCustomers(query: string, currentPage: number) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const customers = await prisma.customers.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                _count: {
                    select: {
                        invoices: true
                    }
                },
                invoices: true
            },
            where: {
                OR: [
                    {
                        name: {
                            contains: `%${query}%`
                        }
                    },
                    {
                        email: {
                            contains: `%${query}%`
                        }
                    },
                ]
            },
            skip: offset,
            take: ITEMS_PER_PAGE,
            orderBy: {
                name: 'asc'
            }
        });
        return customers.map(customer => {
            let paidSum = 0;
            let pendingSum = 0;
            customer.invoices.map(invoice => {
                if (invoice.status === "paid") {
                    paidSum += invoice.amount;
                } else {
                    pendingSum += invoice.amount;
                }
            })

            return {
                ...customer,
                totalInvoices: customer._count.invoices,
                paidSum: formatCurrency(paidSum ?? 0),
                pendingSum: formatCurrency(pendingSum ?? 0),
            };
        });
    } catch
        (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customers.');
    }
}

export async function createNewCustomer(name: string, email: string, image_url: string, uuid: string) {
    try {
        await prisma.customers.upsert({
            where: {
                email: email,
            },
            update: {
                image_url: image_url,
            },
            create: {
                uuid: uuid,
                name: name,
                email: email,
                image_url: image_url,
            }
        })
    } catch (error) {
        console.log("error during creating customer", error);
        throw new Error('Failed to create customer.');
    }
}

export async function fetchCustomerById(id: number): Promise<Customer | null> {
    try {
        return await prisma.customers.findUnique({
            where: {id: id}
        });
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch customer.');
    }
}

export async function updateExistCustomer(
    customer_id: number,
    data: {
        name: string;
        email: string;
        uuid: string;
        image_url: string;
    }
) {
    try {
        await prisma.customers.update({
            where: {
                id: customer_id
            },
            data: data
        })
    } catch (error) {
        console.log("error during updating customer", error);
        throw new Error('Failed to update customer.');
    }
}

export async function deleteExistCustomer(customer_id: number) {
    try {
        await prisma.customers.delete({
            where: {
                id: customer_id
            },
        })
    } catch (error) {
        console.log("error during deleting customer", error);
        throw new Error('Failed to delete customer.');
    }
}


// Users
export async function getUserByEmail(email: string) {
    try {
        return await prisma.users.findUnique({
            where: {
                email: email
            }
        });
    } catch (err) {
        throw new Error('Failed to fetch user.');
    }
}

// Create data items
async function seedUsers() {
    try {
        return await Promise.all(
            users.map(
                async (user) => (
                    await prisma.users.upsert({
                        where: {email: user.email},
                        update: {
                            name: `${user.name}`,
                        },
                        create: {
                            name: user.name,
                            email: user.email,
                            password: user.password,
                        }
                    })
                )
            )
        );
    } catch (error) {
        console.log("error users", error)
    }
}

async function seedInvoices() {
    try {
        return await Promise.all(
            invoices.map(
                async (invoice) => {
                    const customer = await prisma.customers.findUnique({
                        where: {uuid: invoice.customer_id}
                    });

                    if (!customer) {
                        throw new Error(`Customer not found: ${invoice.customer_id}`);
                    }

                    await prisma.invoices.upsert({
                        where: {
                            customer_id_amount_status: {
                                customer_id: customer.id,
                                status: invoice.status,
                                amount: invoice.amount,
                            },
                        },
                        update: {
                            date: new Date()
                        },
                        create: {
                            customer_id: customer.id,
                            status: invoice.status,
                            amount: invoice.amount,
                            date: undefined,
                        }
                    })
                })
        );
    } catch (error) {
        console.log("error invoices", error)
    }
}

async function seedCustomers() {
    try {
        return await Promise.all(
            customers.map(
                async (customer) => (
                    await prisma.customers.upsert({
                        where: {uuid: customer.id},
                        update: {
                            name: `${customer.name}`,
                        },
                        create: {
                            name: customer.name,
                            email: customer.email,
                            image_url: customer.image_url,
                            uuid: customer.id,
                        }
                    })
                )
            )
        );
    } catch (error) {
        console.log("error customers", error);
    }
}

async function seedRevenue() {
    try {
        return await Promise.all(
            revenue.map(
                async (r) => (
                    await prisma.revenues.upsert({
                        where: {
                            month_revenue: {
                                month: r.month,
                                revenue: r.revenue,
                            },
                        },
                        update: {},
                        create: {
                            month: r.month,
                            revenue: r.revenue,
                        }
                    })
                )
            )
        );
    } catch (error) {
        console.log("error revenues", error)
    }
}

async function seedItems() {
    try {
        const insertedInvoices = await Promise.all(
            invoices.map(
                async (invoice) => {
                    const customer = await prisma.customers.findUnique({
                        where: {uuid: invoice.customer_id}
                    });

                    if (!customer) {
                        throw new Error('Customer not found');
                    }

                    await prisma.invoices.create({
                        data: {
                            customer_id: customer.id,
                            status: invoice.status,
                            amount: invoice.amount,
                            date: undefined,
                        },
                    })
                })
        );

        return await prisma.invoices.findMany();
    } catch (error) {
        console.log("error revenues", error)
    }
}

export async function GET() {
    try {
        await seedUsers();
        await seedCustomers();
        await seedInvoices();
        await seedRevenue();
        return Response.json({message: 'Database seeded successfully'});
    } catch (error) {
        console.log(error)
        return Response.json({error}, {status: 500});
    }
}
