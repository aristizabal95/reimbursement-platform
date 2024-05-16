import type {Meta, StoryObj} from '@storybook/react';
import { EventCard } from '@/components/EventCard';

const meta = {
    title: 'Example/EventCard',
    component: EventCard,
    parameters: {
    },
    argTypes: {
        created_at: {
            control: 'date',
        },
        starts_at: {
            control: 'date',
        },
        ends_at: {
            control: 'date',
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

var created_at_date = new Date()
created_at_date.setDate(created_at_date.getDate() - 5)

var starts_at_date = new Date()
starts_at_date.setDate(starts_at_date.getDate() + -3)

var ends_at_date = new Date()
ends_at_date.setDate(ends_at_date.getDate() + 15)

export const WithoutImage: Story = {
    args: {
        id: 45,
        title: 'NerdaPalooza',
        center_of_costs: 'Center',
        budget: 1200,
        currency: 'COP',
        event_status: 0,
        created_at: created_at_date,
        starts_at: starts_at_date,
        ends_at: ends_at_date,
        with_image: false,
    },
}