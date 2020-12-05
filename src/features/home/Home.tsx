import { Anchor, Heading, Paragraph, Text } from "grommet";
import {
  allCustomersSelector,
  fetchCustomers,
} from "../customers/customersSlice";
import React from "react";

import isActive from "../../lib/isActive";
import { useAppDispatch } from "../../lib/store";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const customers = useSelector(allCustomersSelector);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const activePlans = customers.filter(isActive).length;

  return (
    <React.Fragment>
      <Heading level={2}>Welcome</Heading>
      <Paragraph fill>
        Welcome to the TNM admin app. Please have a play around, but please note
        that <strong>this app is not ready to be used with real data</strong>.
        Authentication and storage is mostly done now, but parts of it still
        don&apos;t work. Please note that I am actively developing this version
        of the application which means things{" "}
        <strong>might occasionally break</strong>.
      </Paragraph>
      <Paragraph fill>
        If things do appear to be broken, try deleting all the test data you
        have added and starting again (this will work if the breakage is because
        I&apos;ve changed the &apos;shape&apos; of the data that is in use). If
        this doesn&apos;t work, try waiting a few days. You are welcome to drop
        me a message, but I reserve the right to tell you to be patient.
      </Paragraph>
      <Heading level={3}>In Numbers</Heading>
      <Paragraph>
        <ul>
          <li>
            Currently Active plans: <strong>{activePlans}</strong>
          </li>
        </ul>
      </Paragraph>

      <Heading level={3}>Changes</Heading>

      <Heading level={4}>4th of December</Heading>
      <Paragraph>
        <ul>
          <li>
            <Text>
              Data is now stored in the cloud, not on your browser (mostly)
            </Text>
          </li>
          <li>
            <Text>The authentation system has now been put in place</Text>
          </li>
        </ul>
      </Paragraph>
      <Heading level={4}>18th of November 2020</Heading>
      <ul>
        <li>
          <Text>
            I&apos;ve made some behind the scenes changes which means the app
            loads slightly faster.
          </Text>
        </li>
        <li>
          <Text>
            There is now a &apos;pause&apos; button the customers page. This can
            be used to set either a time limited, indefinite, or future pause
            depending on whether you set a pause start, pause end or both.
          </Text>
        </li>
        <li>
          <Text>
            You can now visit individual pages without opening the browser on
            the homepage first
          </Text>
        </li>
      </ul>
      <Heading level={4}>15th of November 2020</Heading>
      <ul>
        <li>
          <Text>
            Delete buttons now display a dialog asking you to confirm deletion
          </Text>
        </li>
        <li>
          <Text>
            There is now an &apos;exclusions&apos; page that you can use to add
            custom exclusions which you can then select on both customers and
            recipes. (<strong>Note</strong> that the &apos;allergen&apos;
            checkbox doesn&apos;t do anything yet)
          </Text>
        </li>
        <li>
          <Text>
            I&apos;ve changed the component framework from{" "}
            <Anchor href="https://evergreen.segment.com/">Evergreen</Anchor> to{" "}
            <Anchor href="https://v2.grommet.io/">Grommet</Anchor> because I was
            finding the former to be quite limiting. This is why the app now
            looks completely different
          </Text>
        </li>
      </ul>
      <Paragraph fill>
        For more information on what&apos;s still to come, checkout the{" "}
        <Anchor href="https://github.com/benwainwright/tnm/projects/1">
          project board
        </Anchor>{" "}
        on the GitHub repository for this site. If you have any ideas or bug
        reports, please raise it there.
      </Paragraph>
    </React.Fragment>
  );
};

export default Home;
