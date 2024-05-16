import {Card, Image, Text, Badge, Button, Group} from '@mantine/core'
import classes from './EventCard.module.css'

interface EventCardProps {
    /**
     * ID of the event
     */
    id: number;
    /**
     * The title of the event
     */
    title: string;
    /**
     * Which center of costs is related to this event
     */
    center_of_costs: string;
    /**
     * Total budget available for this event
     */
    budget: number;
    /**
     * Currency the budget is represented as
     */
    currency: string;
    /**
     * The status of the event, wether it is active, cancelled, etc.
     */
    event_status: 0 | 1 | 2;
    /**
     * Date at which the event was created
     */
    created_at: Date;
    /**
     * Date at which the event starts
     */
    starts_at: Date;
    /**
     * Date at which the event ends
     */
    ends_at: Date;
    /**
     * Image URL. If not provided, the default factored logo will be used
     */
    image_url?: string;
    /**
     * Wether to display the image or not
     */
    with_image?: boolean;
    /**
     * Wether to display description
     */
    with_desc?: boolean;
}

function statusBadge(status:number) {
    var badges = {
        0: {'name': 'Active', 'color': 'green'},
        1: {'name': 'Finished', 'color': 'gray'},
        2: {'name': 'Canceled', 'color': 'red'},
    }
    var status_key = status as keyof typeof badges
    var badge = badges[status_key]
    return <Badge color={badge['color']}>{badge['name']}</Badge>
}

function daysBetween(date1: Date, date2: Date) {
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays
}

function timeString(starts_at: Date, ends_at: Date) {
    var now = new Date();
    if (now.getTime() < starts_at.getTime()) {
        var days = daysBetween(now, starts_at)
        return `Starts in ${days} day(s)`
    }
    if (now.getTime() < ends_at.getTime()) {
        var days = daysBetween(now, ends_at)
        return `Ends in ${days} day(s)`
    }
    return ''

}

const EventCard = ({
    id,
    title,
    center_of_costs,
    budget,
    currency,
    event_status,
    created_at,
    starts_at,
    ends_at,
    image_url,
    with_image,
    with_desc,
    ...props
}: EventCardProps) => {
    created_at = new Date(created_at);
    starts_at = new Date(starts_at);
    ends_at = new Date(ends_at);
    return (
        <Card shadow='sm' padding='lg' radius='md' withBorder>
            {with_image &&
            <Card.Section>
                <Image
                    src={image_url || '/factored-logo-primary.svg'}
                    alt='event-img'
                    h={100}
                />
            </Card.Section>
            }
            <Text fw={500} truncate="end" w={120}>{title}</Text>
            {statusBadge(event_status)}
            <Group justify='space-between'>
                <Text fw={250}>{starts_at.toLocaleDateString()} - {ends_at.toLocaleDateString()}</Text>
                <Text fw={500}>{timeString(starts_at, ends_at)}</Text>
            </Group>
            {with_desc &&
            <Text size='sm' c='dimmed'>
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>
            }
            <Button color='blue' fullWidth mt='md' radius='md'>
                Check details
            </Button>
        </Card>
    )
}

export {EventCard, type EventCardProps}