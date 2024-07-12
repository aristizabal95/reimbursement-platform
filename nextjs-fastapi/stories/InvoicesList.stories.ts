import type { Meta, StoryObj } from "@storybook/react";
import { InvoicesList } from "@/components/InvoicesList";
import { InvoiceListItemProps } from "@/components/InvoiceListItem";

const meta = {
  title: "Example/InvoicesList",
  component: InvoicesList,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof InvoicesList>;

export default meta;
type Story = StoryObj<typeof meta>;

let invoices: InvoiceListItemProps[] = [
  {
    id: 45,
    img_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/uRm-_o3eNx95U8OSpzC3Yw/l.jpg",
    amount: 35700,
    currency: "COP",
    vendor: "Dr. Riing",
    date: new Date(),
    expense: {
      name: "Lunch",
    },
    description: "Almuerzo en la cafeteria. Las bebidas no estan incluidas",
  },
  {
    id: 46,
    img_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/zRfa1cz0I64Z_6GuLCw9RQ/l.jpg",
    amount: 125,
    currency: "USD",
    vendor: "Apple",
    date: new Date(),
    expense: {
      name: "Equipment",
    },
    description: "Needed a new iphone for work",
  },
  {
    id: 47,
    img_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/uRm-_o3eNx95U8OSpzC3Yw/l.jpg",
    amount: 35700,
    currency: "COP",
    vendor: "Dr. Riing",
    date: new Date(),
    expense: {
      name: "Lunch",
    },
    description: "Almuerzo en la cafeteria. Las bebidas no estan incluidas",
  },
];

export const WithUser: Story = {
  args: {
    invoices: invoices,
  },
};
