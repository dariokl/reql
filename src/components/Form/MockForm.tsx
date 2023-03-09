import React from "react";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import { CiSaveUp2, CiTrash } from "react-icons/ci";
import IconButtonWrapper from "../Common/IconButtonWrapper";
import { useFormContext } from "react-hook-form";

interface IProps {
  onSave: () => void;
  onDelete: () => void;
}

const MockForm: React.FC<IProps> = ({ onSave, onDelete }): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex justify-between py-4 px-2 ">
      <div className="flex gap-2">
        <Select {...register("type")} />
        <Input
          placeholder="Enter your operation Name..."
          {...register("name", {
            required: true,
          })}
          error={Boolean(errors?.name)}
        />
      </div>
      <div className="flex items-center justify-end">
        <IconButtonWrapper onClick={onSave}>
          <CiSaveUp2 size={20} title="Save" />
        </IconButtonWrapper>
        <IconButtonWrapper onClick={onDelete}>
          <CiTrash size={20} title="Delete" />
        </IconButtonWrapper>
      </div>
    </div>
  );
};

export default MockForm;
