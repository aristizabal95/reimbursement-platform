import { useState } from "react";
import { Group, Text, rem, Grid, TextInput, NativeSelect } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";

interface InvoiceFormProps {
  /**
   * Invoice ID
   */
  id: number;
  /**
   * Invoice image url
   */
  url: string;
  /**
   * Name of the vendor associated to the invoice
   */
  vendor: string;
  /**
   * Expense this invoice belongs to
   */
  expense: object | null;
  /**
   * Available expenses that the user can select from
   */
  available_expenses: Array<object>;
  /**
   * Cost associated to the invoice
   */
  amount: number;
  /**
   * Currency of the invoice
   */
  currency: "USD" | "COP";
  /**
   * Date at which the invoice was generated
   */
  date: Date;
  /**
   * Additional comments or description of the invoice
   */
  description: string;
  /**
   * Parent handler for adding an invoice
   */
  addInvoice: (data: object) => null;
}

const InvoiceForm = ({
  id = NaN,
  url = "",
  vendor = "",
  expense = null,
  available_expenses,
  amount = NaN,
  currency = "USD",
  date = new Date(),
  description = "",
  addInvoice,
  ...props
}: InvoiceFormProps) => {
  const [invoice, setInvoice] = useState({
    id: null,
    url: "",
    vendor: "",
    expense: null,
    amount: null,
    currency: "USD",
    date: new Date(),
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Run a callback from parent form to add the invoice
    // Reset invoice values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: invoice,

    validate: {},
  });

  return (
    <form onSubmit={handleSubmit}>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        <Group
          justify="center"
          gap="xl"
          mih={220}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Vendor"
            withAsterisk
            value={invoice["vendor"]}
            onChange={handleChange}
          />
          <NativeSelect
            value={expense === null ? null : expense["name"]}
            onChange={handleChange}
            data={["React", "Angular", "Svelte", "Vue"]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DateInput
            label="Date"
            withAsterisk
            value={invoice["date"]}
            onChange={handleChange}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
};

export { InvoiceForm, type InvoiceFormProps };
