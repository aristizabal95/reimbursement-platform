import type {Meta, StoryObj} from '@storybook/react';
import { Table } from '@mantine/core';
import { RequestListItem } from '@/components/RequestListItem';

const meta: Meta<typeof RequestListItem> = {
    component: RequestListItem,
    decorators: [
        (Story) => (
            <Table>
                <Story />
            </Table>
        ),
    ],
    parameters: {
    },
    tabs: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUser: Story = {
    args: {
        id: 45,
        display_user: true,
        avatar_url: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
        user_name: 'Robert Wolfkisser',
        user_email: 'rob_wolf@gmail.com',
        event: "NerdaPalooza",
        created_at: new Date(),
        total_amount: 400000,
        currency: 'COP',
        status: 'pending',
    },
}