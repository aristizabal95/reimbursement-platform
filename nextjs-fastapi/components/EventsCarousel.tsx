import { Carousel } from '@mantine/carousel';
import {EventCard, EventCardProps} from "./EventCard";
import classes from "./EventsCarousel.module.css"

interface EventsCarouselProps {
  /**
   * The events to be displayed in the carousel.
   * Must be an array of objects containing props
   * for an Event component
   */
  events: EventCardProps[];
  /**
   * Wether or not events should display the image
   */
  with_image?: boolean;
  /**
   * Wether or not events should display the description
   */
  with_desc?: boolean;
}


export const EventsCarousel = ({
  events,
  with_image,
  with_desc
}:EventsCarouselProps) => {
  return (
    <Carousel classNames={classes}
      withIndicators
      slideSize="33.333333%"
      slideGap="md"
      align="start"
      controlsOffset="xs"
      controlSize={20}
      slidesToScroll={3}
    >
      {events.map(event => (
        <Carousel.Slide key={event.id}>
          <EventCard {...event} with_image={with_image} with_desc={with_desc} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}