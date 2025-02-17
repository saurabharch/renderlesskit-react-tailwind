import React from "react";
import { Meta } from "@storybook/react/types-6-0";

import {
  storyTemplate,
  createUnionControl,
} from "../../../.storybook/storybookUtils";
import { Alert, AlertProps } from "../index";

export default {
  title: "Alert",
  component: Alert,
  argTypes: {
    status: createUnionControl([
      "neutral",
      "info",
      "success",
      "warning",
      "error",
    ]),
    title: { defaultValue: "" },
    description: { defaultValue: "" },
    actionButtonLabel: { defaultValue: "" },
  },
} as Meta;

const base = storyTemplate<AlertProps>(
  args => {
    const status = args?.status || "info";

    return <Alert status={status} {...args} />;
  },
  {
    status: "info",
    title: "Your browser is outdated.",
    description: "",
    actionButtonLabel: "",
    closable: false,
  },
);

export const Default = base({});
export const Closable = base({ closable: true });
export const ActionButtonLabel = base({
  actionButtonLabel: "Reach Out",
  closable: true,
});
export const WithDescription = base({
  description: "Your experience may be degraded.",
  actionButtonLabel: "Reach Out",
  closable: true,
});
