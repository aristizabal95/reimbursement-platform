import type {Meta, StoryObj} from '@storybook/react';
import { RequestsList } from '@/components/RequestsList';
import { RequestListItemProps } from '@/components/RequestListItem';

const meta = {
    title: 'Example/RequestsList',
    component: RequestsList,
    parameters: {
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RequestsList>;

export default meta;
type Story = StoryObj<typeof meta>;

let requests: RequestListItemProps[] = [
    {
        id: 34,
        display_user: true,
        avatar_url: 'https://ca.slack-edge.com/TJ957TZ34-U01RV7T7ZCM-f3e0005f3fbd-512',
        user_name: 'Alejandro Aristizabal',
        user_email: 'alejandro.aristizabal@factored.ai',
        event: "NerdaPalooza",
        created_at: new Date(),
        total_amount: 358000,
        currency: 'COP',
        status: 'pending',
    },
    {
        id: 35,
        display_user: true,
        avatar_url: 'https://ca.slack-edge.com/TJ957TZ34-U039NH9QWG5-3db5ff8bc677-512',
        user_name: 'Daniel Velásquez Vásquez',
        user_email: 'daniel.velasquez@factored.ai',
        event: "NerdaPalooza",
        created_at: new Date(),
        total_amount: 430000,
        currency: 'COP',
        status: 'approved',
    },
    {
        id: 36,
        display_user: true,
        avatar_url: 'https://ca.slack-edge.com/TJ957TZ34-U039RDNR6AX-0cd3f1911b67-512',
        user_name: 'Jaime Mosquera Gutiérrez',
        user_email: 'jaime.mosquera@factored.ai',
        event: "Graph Study Group Lunch",
        created_at: new Date(),
        total_amount: 120,
        currency: 'USD',
        status: 'reimbursed',
    },
]

export const WithUser: Story = {
    args: {
        requests: requests,
        display_users: true,
    },
}