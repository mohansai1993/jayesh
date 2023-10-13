import axios from "axios";
import ErrorPage from "next/error";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { REQUEST_HEADERS } from "../commonRequestHeader";
import Layout from "../hocs/layout";
import { useAuthReducer } from "../reducers/auth";
import { successToaster } from "../utils";

interface Account {
  id: number;
  email: string;
  approved: boolean;
}

const ApprovedAccount = ({ account }:any) => {
  const [approve, setApprove] = useState(account?.approved);
  const approveBtnHandler = async (email: string) => {
    const body = JSON.stringify({ email: email });

    try {
      const res = await axios.put(
        "/api/accounts/approveWaitList",
        body,
        REQUEST_HEADERS,
      );
      if (res.status === 200) {
        successToaster(res?.data?.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <tr key={account?.id}>
      <td>{account?.id}</td>
      <td>{account?.email}</td>
      <td>
        <div style={{ display: "flex" }}>
          <Button
            variant={approve ? "success" : "info"}
            className="mx-4"
            onClick={useCallback(() => {
              approveBtnHandler(account?.email);
              setApprove(true);
            }, [account?.email])}
          >
            {approve ? "Already approved" : "Approve now"}
          </Button>
        </div>
      </td>
    </tr>
  );
};

const ApprovalPage = () => {
  const [waitlistAccounts, setWaitlistAccounts] = useState<Account[]>([]);
  const { user } = useAuthReducer();

  const getWaitlistUser = async () => {
    try {
      if (user !== null) {
        const res = await axios.get(
          `/api/accounts/getWaitListAccount`,
          REQUEST_HEADERS,
        );
        if (res?.data) {
          setWaitlistAccounts(res?.data?.data);
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWaitlistUser();
  }, [user]);

  return (
    <Fragment>
      <Layout>
        {waitlistAccounts?.length > 0 ? (
          <div className="mx-4 my-4">
            <h1 className="text-center py-4">User Waitlist</h1>
            <Card style={{ margin: "auto", maxWidth: "600px" }}>
              <Card.Body>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlistAccounts?.map((account) => {
                      const { id } = account;
                      return <ApprovedAccount account={account} key={id} />;
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <ErrorPage statusCode={404} />
        )}
      </Layout>
    </Fragment>
  );
};

export default ApprovalPage;
