import {
  Image,
  Badge,
  Table,
  Group,
  Text,
  Button,
  Link,
  Tooltip,
} from "@mantine/core";
import { IconPhoto, IconDownload, IconArrowRight } from "@tabler/icons-react";
import classes from "./InvoiceListItem.module.css";

interface InvoiceListItemProps {
  /**
   * ID of the invoice
   */
  id: number;
  /**
   * URL of the invoice image
   */
  img_url: string;
  /**
   * Amount spent
   */
  amount: number;
  /**
   * Currency of the invoice
   */
  currency: "USD" | "COP";
  /**
   * Vendor from which the invoice was generated
   */
  vendor: string;
  /**
   * Date at which the invoice was generated
   */
  date: Date;
  /**
   * Information of the associated expense
   */
  expense: object;
  /**
   * Additional comments or description of the invoice
   */
  description: string;
  /**
   * Wether this item should display editable buttons
   */
  editable: boolean;
}

function CurrencyAmount(amount: number, currency: string) {
  const locales = {
    COP: "es-CO",
    USD: "en-US",
  };
  var locale_key = currency as keyof typeof locales;
  let formatter = new Intl.NumberFormat(locales[locale_key], {
    style: "currency",
    currency: currency,
  });

  return `${formatter.format(amount)} ${currency}`;
}

const InvoiceListItem = ({
  id,
  img_url,
  amount,
  currency,
  vendor,
  date,
  expense,
  description,
  editable = false,
  ...props
}: InvoiceListItemProps) => {
  // Extracting date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  // Concatenating date components
  const formattedDate = `${year}-${month}-${day}`;
  const amountStr = CurrencyAmount(amount, currency);
  return (
    <Table.Tr key={id} className={classes.tr}>
      <Table.Td>
        <Group gap="sm">
          <Image radius="md" h={40} w={40} src={img_url} alt="invoice-image" />
          <div>
            <Tooltip label={vendor}>
              <Text fz="sm" fw={500} truncate="end">
                {vendor}
              </Text>
            </Tooltip>
            <Text fw={200} truncate="end" fz="xs">
              {formattedDate}
            </Text>
            <Tooltip label={expense["name"]}>
              <Text fz="sm" fw={500} truncate="end">
                {expense["name"]}
              </Text>
            </Tooltip>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Tooltip label={amountStr}>
          <Text fz="sm" fw={500} truncate="end">
            {amountStr}
          </Text>
        </Tooltip>
      </Table.Td>
      <Table.Td>
        {editable && (
          <Button
            variant="filled"
            size="compact-md"
            right
            component={Link}
            href="/requests/{request_id}"
            rightSection={<IconDownload size={14} />}
          >
            Edit
          </Button>
        )}
        {!editable && (
          <Button
            variant="filled"
            size="compact-md"
            right
            component={Link}
            href="/requests/{request_id}"
          >
            Inspect
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

export { InvoiceListItem, type InvoiceListItemProps };
