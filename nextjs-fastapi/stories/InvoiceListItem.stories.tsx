import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "@mantine/core";
import { InvoiceListItem } from "@/components/InvoiceListItem";

const meta: Meta<typeof InvoiceListItem> = {
  component: InvoiceListItem,
  decorators: [
    (Story) => (
      <Table>
        <Story />
      </Table>
    ),
  ],
  parameters: {},
  tabs: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUser: Story = {
  args: {
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
};
