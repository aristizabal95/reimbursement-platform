import {Avatar, Badge, Table, Group, Text, Button, Link, Tooltip} from '@mantine/core';
import classes from './RequestListItem.module.css';

interface RequestListItemProps {
    /**
     * Should this item display user information?
     */
    display_user?: boolean;
    /**
     * User avatar URL
     */
    avatar_url?: string;
    /**
     * User name
     */
    user_name?: string;
    /**
     * User email
     */
    user_email?: string;
    /**
     * Request ID from the database
     */
    id: number;
    /**
     * Event related to the reimbursement request
     */
    event: string;
    /**
     * Timestamp for the creation of this request
     */
    created_at: Date;
    /**
     * Total amount of the request
     */
    total_amount: number;
    /**
     * Currency of the reported amount
     */
    currency: 'COP' | 'USD';
    /**
     * Status of the request
     */
    status: 'pending' | 'approved' | 'reimbursed' | 'denied';
}

function StatusBadge(status:string) {
    var badge_colors = {
        pending: 'gray',
        approved: 'green',
        reimbursed: 'purple',
        denied: 'red',
    }
    var status_key = status as keyof typeof badge_colors;
    return <Badge color={badge_colors[status_key]} fullWidth variant='light'>
        {status.toUpperCase()}
        </Badge>
}

function CurrencyAmount(amount: number, currency: string) {
    const locales = {
        'COP': 'es-CO',
        'USD': 'en-US',
    }
    var locale_key = currency as keyof typeof locales;
    let formatter = new Intl.NumberFormat(locales[locale_key], {
        style: 'currency',
        currency: currency,
    });

    return `${formatter.format(amount)} ${currency}`
}

const RequestListItem = ({
    display_user = false,
    avatar_url = "",
    user_name = "",
    user_email = "",
    id,
    event,
    created_at,
    total_amount,
    currency,
    status,
    ...props
}: RequestListItemProps) => {
    // Extracting date components
    const year = created_at.getFullYear();
    const month = String(created_at.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(created_at.getDate()).padStart(2, '0');

    // Concatenating date components
    const formattedDate = `${year}-${month}-${day}`;
    return (
        <Table.Tr key={id} className={classes.tr}>
            {display_user && 
                <Table.Td>
                    <Group gap="sm">
                        <Avatar size={40} src={avatar_url} radius={40} />
                        <div>
                            <Tooltip label={user_name}>
                                <Text fz="sm" fw={500} visibleFrom="md" truncate="end">
                                    {user_name}
                                </Text>
                            </Tooltip>
                            <Tooltip label={user_email}>
                                <Text fz="xs" c="dimmed" visibleFrom="md" truncate="end" >
                                    {user_email}
                                </Text>
                            </Tooltip>
                        </div>
                    </Group>
                </Table.Td>
            }

            <Table.Td>
                <Tooltip label={event}>
                    <Text truncate="end">{event}</Text>
                </Tooltip>
            </Table.Td>
            <Table.Td visibleFrom="md">{formattedDate}</Table.Td>
            <Table.Td>{CurrencyAmount(total_amount, currency)}</Table.Td>
            <Table.Td>{StatusBadge(status)}</Table.Td>
            <Table.Td>
                <Button variant='filled' size="compact-md" component={Link} href='/requests/{request_id}'>
                    Inspect
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export {RequestListItem, type RequestListItemProps}