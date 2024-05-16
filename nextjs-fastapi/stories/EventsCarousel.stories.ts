import type {Meta, StoryObj} from '@storybook/react';
import { EventsCarousel } from '@/components/EventsCarousel';
import { EventCardProps } from '@/components/EventCard';
const meta = {
    title: 'Example/EventsCarousel',
    component: EventsCarousel,
    parameters: {
    },
    argTypes: {
    },
    tags: ['autodocs'],
} satisfies Meta<typeof EventsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

var created_at_date = new Date()
created_at_date.setDate(created_at_date.getDate() - 5)

var starts_at_date = new Date()
starts_at_date.setDate(starts_at_date.getDate() + -3)

var ends_at_date = new Date()
ends_at_date.setDate(ends_at_date.getDate() + 15)

let event: EventCardProps = {
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
}

let events: EventCardProps[] = [
    {
        id: 45,
        title: 'NerdaPalooza',
        center_of_costs: 'Center',
        budget: 1200,
        currency: 'COP',
        event_status: 0,
        created_at: created_at_date,
        starts_at: starts_at_date,
        ends_at: ends_at_date,
        with_image: true,
    },
    {
        id: 46,
        title: 'MLCommons Dinner',
        center_of_costs: 'Center',
        budget: 1200,
        currency: 'COP',
        event_status: 0,
        created_at: created_at_date,
        starts_at: starts_at_date,
        ends_at: ends_at_date,
        with_image: true,
        image_url: "https://mms.businesswire.com/media/20201203005641/en/843858/22/mlc_lockup_black_green.jpg"
    },
    {
        id: 46,
        title: 'Hackathon',
        center_of_costs: 'Center',
        budget: 1200,
        currency: 'COP',
        event_status: 2,
        created_at: created_at_date,
        starts_at: starts_at_date,
        ends_at: ends_at_date,
        with_image: true,
        image_url: "https://assets-global.website-files.com/6597cc7be68d63ec0c8ce33f/65b5637aefbe0d22e15c5731_xDay-Hackathon--2--1--1.jpeg"
    },
    {
        id: 47,
        title: 'NerdaPalooza',
        center_of_costs: 'Center',
        budget: 1200,
        currency: 'COP',
        event_status: 0,
        created_at: created_at_date,
        starts_at: starts_at_date,
        ends_at: ends_at_date,
        with_image: true,
    },
]

export const WithImages: Story = {
    args: {
        events: events,
        with_image: true
    },
}