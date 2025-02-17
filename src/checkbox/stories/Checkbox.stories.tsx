import React from "react";
import { cx } from "@renderlesskit/react";
import { Meta } from "@storybook/react/types-6-0";

import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  CheckboxProps,
  CheckboxStatus,
  CheckboxIcon,
  CheckboxText,
} from "../index";
import {
  createUnionControl,
  storyTemplate,
} from "../../../.storybook/storybookUtils";

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    size: createUnionControl({
      sm: "sm",
      md: "md",
      lg: "lg",
    }),
    defaultState: createUnionControl([true, false, "indeterminate"]),
    disabled: { control: { type: "boolean" } },
  },
} as Meta;

const base = storyTemplate<CheckboxProps>(Checkbox, {
  children: "Checkbox",
  size: "md",
  defaultState: true,
});

export const Small = base({ size: "sm" });

export const Medium = base({});

export const Large = base({ size: "lg" });

export const DefaultUnchecked = base({ defaultState: false });

export const DefaultChecked = base({ defaultState: true });

export const Disabled = base({ disabled: true });

export const Controlled = storyTemplate<CheckboxProps>(args => {
  const [state, onStateChange] = React.useState<CheckboxStatus>(false);

  return (
    <>
      <Checkbox state={state} onStateChange={onStateChange} {...args}>
        Checkbox
      </Checkbox>
      <div className="mt-2">{`Checked: ${state}`}</div>
    </>
  );
})({ size: "md" });

export const Group = storyTemplate<CheckboxProps>(args => {
  const [state, onStateChange] = React.useState<CheckboxStatus>([]);

  return (
    <>
      <div className="mb-2">Choices: {(state as string[]).join(", ")}</div>
      <Checkbox
        state={state}
        onStateChange={onStateChange}
        value="apple"
        {...args}
      >
        Apple
      </Checkbox>
      <Checkbox
        state={state}
        onStateChange={onStateChange}
        className="ml-2"
        value="orange"
        {...args}
      >
        Orange
      </Checkbox>
      <Checkbox
        state={state}
        onStateChange={onStateChange}
        className="ml-2"
        value="watermelon"
        {...args}
      >
        Watermelon
      </Checkbox>
    </>
  );
})({ size: "md" });

export const GroupIndeterminateSimple = storyTemplate<CheckboxProps>(args => {
  const [checkedItems, setCheckedItems] = React.useState<CheckboxStatus[]>([
    false,
    false,
  ]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <>
      <Checkbox
        state={isIndeterminate ? "indeterminate" : allChecked}
        onStateChange={value => setCheckedItems([value, value])}
        {...args}
      >
        Parent Checkbox
      </Checkbox>
      <div className="flex flex-col pl-6 mt-1">
        <Checkbox
          state={checkedItems[0]}
          onStateChange={value => setCheckedItems([value, checkedItems[1]])}
          {...args}
        >
          Child Checkbox 1
        </Checkbox>
        <Checkbox
          state={checkedItems[1]}
          onStateChange={value => setCheckedItems([checkedItems[0], value])}
          {...args}
        >
          Child Checkbox 2
        </Checkbox>
      </div>
    </>
  );
})({ size: "md" });

export const GroupIndeterminateComplex = storyTemplate<CheckboxProps>(args => {
  const values = React.useMemo(() => ["Apple", "Orange", "Watermelon"], []);
  const [itemState, setItemState] = React.useState<CheckboxStatus>([]);
  const [groupState, setGroupState] = React.useState<CheckboxStatus>(false);

  // updates items when group is toggled
  React.useEffect(() => {
    if (groupState === true) {
      setItemState(values);
    } else if (groupState === false) {
      setItemState([]);
    }
  }, [groupState, values]);

  // updates group when items is toggled
  React.useEffect(() => {
    if (!Array.isArray(itemState)) return;

    if (itemState.length === values.length) {
      setGroupState(true);
    } else if (itemState.length) {
      setGroupState("indeterminate");
    } else {
      setGroupState(false);
    }
  }, [itemState, values]);

  return (
    <>
      <Checkbox state={groupState} onStateChange={setGroupState} {...args}>
        Fruits
      </Checkbox>
      <div className="flex flex-col pl-6 mt-1">
        {values.map((value, i) => {
          return (
            <Checkbox
              key={i}
              state={itemState}
              onStateChange={setItemState}
              value={value}
              {...args}
            >
              {value}
            </Checkbox>
          );
        })}
      </div>
    </>
  );
})({ size: "md" });

const CheckboxCustom = (props: CheckboxProps) => {
  const [state, onStateChange] = React.useState<CheckboxStatus>(true);

  return (
    <Checkbox state={state} onStateChange={onStateChange} {...props}>
      <CheckboxLabel>
        <CheckboxInput />
        <CheckboxIcon className="w-8 h-8 text-2xl text-white bg-blue-500" />
        <CheckboxText className="text-orange-500">Custom Checkbox</CheckboxText>
      </CheckboxLabel>
    </Checkbox>
  );
};

export const CustomCheckbox = storyTemplate<CheckboxProps>(CheckboxCustom)({});

// Inspired from https://codepen.io/geertsdev/pen/yLaGLJq
const CheckboxCustomComplete = (props: CheckboxProps) => {
  const { className, children, ...rest } = props;
  return (
    <Checkbox {...props}>
      <CheckboxLabel
        className={cx("px-8 py-2 border-2 border-blue-500 rounded", className)}
        {...rest}
      >
        <CheckboxInput />
        {(props?.state as string[]).includes(props?.value as string) ? (
          <span
            aris-hidden="true"
            role="img"
            className="text-blue-500 absolute inset-y-0 left-0 flex items-center pl-1.5"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ) : null}
        <span className="select-none">{children}</span>
      </CheckboxLabel>
    </Checkbox>
  );
};

export const CompleteCustomCheckbox = storyTemplate<CheckboxProps>(args => {
  const [state, onStateChange] = React.useState<CheckboxStatus>([]);

  return (
    <>
      <CheckboxCustomComplete
        value="one"
        state={state}
        onStateChange={onStateChange}
        {...args}
      >
        Button one 😁
      </CheckboxCustomComplete>
      <CheckboxCustomComplete
        className="ml-2"
        value="two"
        state={state}
        onStateChange={onStateChange}
        {...args}
      >
        Button two 🤓
      </CheckboxCustomComplete>
      <CheckboxCustomComplete
        className="ml-2"
        value="three"
        state={state}
        onStateChange={onStateChange}
        {...args}
      >
        Button three 👻
      </CheckboxCustomComplete>
    </>
  );
})({});
