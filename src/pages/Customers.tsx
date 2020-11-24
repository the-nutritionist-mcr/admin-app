import { AppState, useAppDispatch } from "../redux";
import {
  Button,
  Header,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
} from "grommet";

import { Customer, createCustomerAction } from "../redux/reducers/customers";
import CustomerRow from "../components/CustomerRow";
import EditCustomerDialog from "../components/EditCustomerDialog";
import React from "react";
import { connect } from "react-redux";
import { plans } from "../lib/config";

interface CustomersProps {
  customers: Customer[];
}

const RawCustomers: React.FC<CustomersProps> = (props) => {
  const dispatch = useAppDispatch();
  const [showEditCustomer, setShowEditCustomer] = React.useState(false);
  return (
    <React.Fragment>
      <Header align="center" justify="start" gap="small">
        <Heading level={2}>Customers</Heading>
        <Button
          primary
          size="small"
          onClick={(): void => {
            setShowEditCustomer(true);
          }}
          label="New"
          a11yTitle="New Customer"
        />
        {showEditCustomer && (
          <EditCustomerDialog
            title="Create New Customer"
            onOk={(customer): void => {
              dispatch(createCustomerAction(customer));
              setShowEditCustomer(false);
            }}
            onCancel={(): void => {
              setShowEditCustomer(false);
            }}
            customer={{
              id: "",
              startDate: null,
              notes: null,
              createdAt: "",
              updatedAt: "",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              exclusions: [] as any,
              pauseEnd: null,
              pauseStart: null,
              paymentDateOfMonth: null,
              legacyPrice: null,
              address: "",
              firstName: "",
              surname: "",
              telephone: "",
              email: "",
              daysPerWeek: 1,
              plan: plans[0],
              salutation: "",
              snack: "None",
              breakfast: false,
            }}
          />
        )}
      </Header>
      {props.customers.length > 0 ? (
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell scope="col">
                <strong>Name</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Plan</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Extras</strong>
              </TableCell>
              <TableCell>
                <strong>Per Week</strong>
              </TableCell>
              <TableCell>
                <strong>Per Month</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Exclusions</strong>
              </TableCell>
              <TableCell scope="col">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onChange={(): void => {
                  // NOOP
                }}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text>
          You&apos;ve not added any customers yet... Click the &apos;new&apos;
          button above to get started!
        </Text>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): CustomersProps => {
  return { customers: state.customers.customers };
};

const Customers = connect(mapStateToProps)(RawCustomers);

export default Customers;
