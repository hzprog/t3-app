import { type User } from "@prisma/client";
import { api } from "../utils/api";

interface CardProps {
  user: User;
}

export const Card = ({ user }: CardProps) => {
  const utils = api.useContext();
  const { mutate: deleteUser } = api.user.delete.useMutation({
    onSuccess: async () => {
      await utils.user.getAll.invalidate();
    },
  });

  const onDeleteClick = () => {
    deleteUser({ id: user.id });
  };

  return (
    <div className=" flex flex-row items-center justify-between rounded-md bg-teal-600 px-2 py-3 text-white">
      <div>
        <h1 className="text-xl">
          {user.name.toUpperCase()} | {user.job.toLowerCase()}
        </h1>
        <p>{user.email}</p>
        <p>{user.age} years old</p>
      </div>
      <div>
        <button
          className="w-auto rounded-md bg-teal-800 px-5 py-2 text-white"
          onClick={onDeleteClick}
        >
          Delete user
        </button>
      </div>
    </div>
  );
};
