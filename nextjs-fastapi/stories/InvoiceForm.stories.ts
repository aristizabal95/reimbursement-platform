import type { Meta, StoryObj } from "@storybook/react";
import { InvoiceForm } from "@/components/InvoiceForm";

const meta = {
  title: "Example/InvoiceForm",
  component: InvoiceForm,
  parameters: {},
  tags: ["autodocs"],
} satisfies Meta<typeof InvoiceForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUser: Story = {
  args: {},
};
