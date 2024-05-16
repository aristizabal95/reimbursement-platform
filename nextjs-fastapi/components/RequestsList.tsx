import { useState } from 'react';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { RequestListItem, RequestListItemProps } from "./RequestListItem";
import classes from "./RequestsList.module.css"

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort, ...props }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
        <Table.Th className={classes.th} {...props}>
        <UnstyledButton onClick={onSort} className={classes.control} {...props}>
            <Group justify="space-between">
            <Text fw={500} fz="sm">
                {children}
            </Text>
            <Center className={classes.icon}>
                <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </Center>
            </Group>
        </UnstyledButton>
        </Table.Th>
  );
}

interface RequestsListProps {
    /**
     * Requests to display
     */
    requests: RequestListItemProps[];
    /**
     * Wether to display all users or not
     */
    display_users?: boolean;
}

function filterData(data: RequestListItemProps[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(item).some((key) => (String(item[key]).toLowerCase().includes(query)))
  );
}

function sortData(
  data: RequestListItemProps[],
  payload: { sortBy: keyof RequestListItemProps | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

const RequestsList = ({
    requests,
    display_users = true,
    ...props
}: RequestsListProps) => {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(requests);
  const [sortBy, setSortBy] = useState<keyof RequestListItemProps | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RequestListItemProps) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(requests, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(requests, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((request) => (
    <RequestListItem 
        key={request.id}
        {...request}
        display_user={display_users}
    />
  ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table className={classes.table}>
                <Table.Thead>
                    <Table.Tr>
                        {display_users &&
                        <Th
                        sorted={sortBy === 'user_name'}
                        reversed={reverseSortDirection}
                        onSort={() => setSorting('user_name')}
                        >
                        User
                        </Th>
                        }
                        <Th
                        sorted={sortBy === 'event'}
                        reversed={reverseSortDirection}
                        onSort={() => setSorting('event')}
                        >
                        Event
                        </Th>
                        <Th
                        sorted={sortBy === 'created_at'}
                        reversed={reverseSortDirection}
                        onSort={() => setSorting('created_at')}
                        visibleFrom="md" 
                        >
                        Date
                        </Th>
                        <Th
                        sorted={sortBy === 'total_amount'}
                        reversed={reverseSortDirection}
                        onSort={() => setSorting('total_amount')}
                        >
                        Total
                        </Th>
                        <Th
                        sorted={sortBy === 'status'}
                        reversed={reverseSortDirection}
                        onSort={() => setSorting('status')}
                        >
                        Status
                        </Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                {rows.length > 0 ? (
                    rows
                ) : (
                    <Table.Tr>
                    <Table.Td colSpan={Object.keys(requests[0]).length}>
                        <Text fw={500} ta="center">
                        Nothing found
                        </Text>
                    </Table.Td>
                    </Table.Tr>
                )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    )
}

export {RequestsList, type RequestsListProps}