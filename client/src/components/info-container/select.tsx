import React from "react";

type SelectProps = {
  items: { label: string; deviceId: string }[];
  dataset: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export function Select(props: SelectProps) {
  return (
    <select
      className="px-2 ml-2 text-black rounded-lg input p2"
      onChange={props.onChange}
    >
      {props.items.map((item) => {
        const dataAttr = {
          [`data-${props.dataset}`]: item.deviceId,
        };
        return (
          <option key={item.deviceId} value={item.deviceId} {...dataAttr}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}
